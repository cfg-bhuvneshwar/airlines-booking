import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { LoginScreenProps } from '../../navigation/types';
import { useAppDispatch } from '../../common/hooks/hooks';
import auth from '@react-native-firebase/auth';
import { createOrUpdateUser } from '../../utils/UserHandler';
import { saveUserData } from '../../state/userSlice';
import { UserData } from '../../utils/types';
import { Colors } from '../../common/constants/Colors';
import { commonStyles } from '../../common/constants/commonStyles';

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userData => {
        const user: UserData = {
          uid: userData.user.uid,
          name: userData.user.displayName ?? '',
          image_url: userData.user.photoURL ?? '',
          email: userData.user.email as string,
        };

        createOrUpdateUser(user, () => {
          dispatch(
            saveUserData({
              uid: user.uid,
              name: user.name,
              email: user.email,
              image_url: user.image_url,
            }),
          );
          navigation.replace('HomeScreen');
        });
      })
      .catch(error => {
        switch (error.code) {
          case 'auth/user-not-found':
            console.log('Account does not exist');
            break;
          case 'auth/invalid-email':
            console.log('That email address is invalid!');
            break;
          case 'auth/weak-password':
            console.log('The given password is invalid');
            break;
          default:
            console.error(error);
            break;
        }
      });
  };

  const handleRegister = () => {
    navigation.replace('RegisterScreen');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={styles.emailPasswordInput}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={[commonStyles.marginTopLarge, styles.emailPasswordInput]}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={{ color: Colors.light }}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
        <Text style={{ color: Colors.dark }}>
          Don't have account Yet? Create Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    padding: 25,
  },
  emailPasswordInput: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  loginButton: {
    backgroundColor: Colors.buttonBackground,
    width: '100%',
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    borderRadius: 25,
    marginTop: 100,
  },
  registerButton: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;
