import { useCallback, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoginScreenProps } from '../../navigation/types';
import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import { saveUserData, selectRegisterData } from '../../state/userSlice';
import { UserData } from '../../utils/types';
import { Colors } from '../../common/constants/Colors';
import { commonStyles } from '../../common/constants/commonStyles';
import Header from '../../common/components/Header';
import ActionButton from '../../common/components/ActionButton';
import CustomKeyboardAvoidingView from '../../common/components/CustomKeyboardAvoidingView';

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
        loyaltyTier: userData.loyaltyTier,
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
      <Header title="Login" icon />
      <CustomKeyboardAvoidingView>
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

          <ActionButton
            label="Login"
            buttonViewStyles={styles.loginButton}
            buttonTextStyles={styles.loginButtonText}
            onPress={handleLogin}
          />

          <ActionButton
            label="Don't have account Yet? Create Account"
            buttonViewStyles={styles.registerButton}
            buttonTextStyles={styles.registerButtonText}
            onPress={() => {
              navigation.replace('RegisterScreen');
            }}
          />
        </View>
      </CustomKeyboardAvoidingView>
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
    backgroundColor: Colors.white,
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
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    borderRadius: 25,
    marginTop: 100,
  },
  loginButtonText: {
    color: Colors.white,
    fontSize: 16,
  },
  registerButton: {
    marginTop: 30,
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    borderRadius: 25,
  },
  registerButtonText: {
    color: Colors.black,
    fontSize: 16,
  },
});

export default LoginScreen;
