import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PreLoginScreenProps } from '../../navigation/types';
import ActionButton from '../../common/components/ActionButton';
import { Colors } from '../../common/constants/Colors';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { savePreLogin } from '../../state/preLoginSlice';

const PreLoginScreen = ({ navigation }: PreLoginScreenProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(savePreLogin(true));
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Already have an account?</Text>
          <Text style={styles.description}>
            See your profile and trips, book flights, and manage your bookings
            easily.
          </Text>
        </View>
        <ActionButton
          label="Login"
          buttonViewStyles={styles.loginButton}
          buttonTextStyles={styles.loginButtonText}
          onPress={() => {
            navigation.navigate('LoginScreen');
          }}
        />
        <ActionButton
          label="Create Account"
          buttonViewStyles={styles.registerButton}
          buttonTextStyles={styles.registerButtonText}
          onPress={() => {
            navigation.navigate('RegisterScreen');
          }}
        />
        <ActionButton
          label="Continue as Guest"
          buttonViewStyles={styles.guestButton}
          buttonTextStyles={styles.guestButtonText}
          onPress={() => {
            navigation.replace('HomeScreen');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: Colors.black,
  },
  description: {
    fontSize: 17,
    color: 'grey',
    marginTop: 10,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: Colors.buttonBackground,
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    borderRadius: 25,
    marginHorizontal: 20,
  },
  loginButtonText: {
    color: Colors.white,
    fontSize: 16,
  },
  registerButton: {
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    borderRadius: 25,
    borderColor: Colors.black,
    marginTop: 20,
    marginHorizontal: 20,
    borderWidth: 1,
  },
  registerButtonText: {
    color: Colors.black,
    fontSize: 16,
  },
  guestButton: {
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    borderRadius: 25,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  guestButtonText: {
    color: Colors.black,
    fontSize: 16,
  },
});

export default PreLoginScreen;
