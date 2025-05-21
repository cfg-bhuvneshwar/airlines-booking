import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PreLoginScreenProps } from '../../navigation/types';

const PreLoginScreen = ({ navigation }: PreLoginScreenProps) => {
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
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('LoginScreen');
          }}
          style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('RegisterScreen');
          }}
          style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.replace('HomeScreen');
          }}
          style={styles.guestButton}>
          <Text style={styles.guestButtonText}>Continue as Guest</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: '#000',
  },
  description: {
    fontSize: 17,
    color: 'grey',
    marginTop: 10,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#cac029',
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    borderRadius: 25,
    margin: 15,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 15,
  },
  registerButton: {
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    borderRadius: 25,
    borderColor: '#000000',
    marginTop: 5,
    marginHorizontal: 15,
    borderWidth: 1,
  },
  registerButtonText: {
    color: '#000',
    fontSize: 15,
  },
  guestButton: {
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    borderRadius: 25,
    borderColor: '#000000',
    marginVertical: 20,
    marginHorizontal: 15,
    borderWidth: 1,
  },
  guestButtonText: {
    color: '#000',
    fontSize: 15,
  },
});

export default PreLoginScreen;
