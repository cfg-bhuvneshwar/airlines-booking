import { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { RegisterScreenProps } from '../../navigation/types';
import { UserData } from '../../utils/types';
import { createOrUpdateUser } from '../../utils/UserHandler';
import { useAppDispatch } from '../../common/hooks/hooks';
import { saveUserData } from '../../state/userSlice';
import { Text } from '@react-navigation/elements';

const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const userData = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
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
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomeScreen' }],
        });
      });
    } catch (error: any) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          console.log('That email address is already in use!');
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
    }
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        flex: 1,
        padding: 25,
      }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{
          height: 40,
          borderWidth: 1,
          padding: 10,
          borderRadius: 10,
        }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          marginTop: 25,
          height: 40,
          borderWidth: 1,
          padding: 10,
          borderRadius: 10,
        }}
      />

      <TouchableOpacity
        onPress={handleRegister}
        style={{
          marginTop: 35,
          backgroundColor: '#cac029',
          width: '100%',
          alignItems: 'center',
          height: 45,
          justifyContent: 'center',
          borderRadius: 25,
        }}>
        <Text style={{ color: 'white' }}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
