import { useCallback, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoginScreenProps } from '../../navigation/types';
import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import { saveUserData, selectRegisterData } from '../../state/userSlice';
import { UserData } from '../../utils/types';
import { Colors } from '../../common/constants/Colors';
import { commonStyles } from '../../common/constants/commonStyles';
import Header from '../../common/components/Header';

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const dispatch = useAppDispatch();
  const registerData = useAppSelector(selectRegisterData);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = useCallback(async () => {
    const userData = registerData.find(
      item => item.email === email && item.password === password,
    ) as UserData;

    dispatch(
      saveUserData({
        uid: userData.uid,
        title: userData.title,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        dob: userData.dob,
        memberType: userData.memberType,
        points: userData.points,
        bookings: userData.bookings,
        miles: userData.miles,
        contactNumber: userData.contactNumber,
      }),
    );
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeScreen' }],
    });
  }, [dispatch, email, navigation, password, registerData]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <Header title="Login" />
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
        <TouchableOpacity
          onPress={() => navigation.replace('RegisterScreen')}
          style={styles.registerButton}>
          <Text style={{ color: Colors.dark }}>
            Don't have account Yet? Create Account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  emailPasswordInput: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
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
