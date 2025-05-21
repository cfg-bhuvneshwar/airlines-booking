import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../common/constants/Colors';
import { useAppSelector, useAppDispatch } from '../../../common/hooks/hooks';
import {
  selectUserData,
  saveUserData,
  selectRegisterData,
} from '../../../state/userSlice';
import Header from '../../../common/components/Header';
import { fontFamilies } from '../../../common/constants/fontFamily';

const ProfileTab = ({ navigation }: any) => {
  const dispatch = useAppDispatch();

  const userData = useAppSelector(selectUserData);
  const registerData = useAppSelector(selectRegisterData);
  console.log('regiterData : ', registerData);

  const handleLogout = () => {
    dispatch(
      saveUserData({
        uid: '',
        title: '',
        firstName: '',
        lastName: '',
        dob: '',
        email: '',
        password: '',
        memberType: '',
        points: 0,
        contactNumber: '',
        miles: 0,
        bookings: 0,
      }),
    );

    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeScreen' }],
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Header title="Profile" />

      {userData.uid === '' ? (
        <View style={styles.guestContainer}>
          <View style={styles.guestContent}>
            <Text style={styles.guestTitle}>Join Guest</Text>
            <Text style={styles.guestDescription}>
              Collect miles and unlock exclusive benefits available only to
              Guest members
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginScreen')}
            style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('RegisterScreen')}
            style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.loggedInContainer}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <Text
              style={[styles.welcomeText, { fontFamily: fontFamilies.Bold }]}>
              {`Welcome, ${userData.firstName}!`}
            </Text>

            <View style={styles.memberInfoContainer}>
              <Text style={styles.memberTypeText}>
                {userData.memberType} Member
              </Text>
              <Text style={styles.pointsText}>{userData.points} Points</Text>
              <Text style={styles.pointsText}>{userData.miles} miles</Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  memberInfoContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    alignItems: 'flex-end',
  },
  memberTypeText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  pointsText: {
    fontSize: 14,
    color: '#fff',
  },
  guestContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  guestContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  guestTitle: {
    fontSize: 22,
    color: '#000',
  },
  guestDescription: {
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
    marginVertical: 10,
    marginHorizontal: 20,
  },
  loginButtonText: {
    color: Colors.light,
    fontSize: 15,
    fontFamily: fontFamilies.SemiBold,
  },
  registerButton: {
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    borderRadius: 25,
    borderColor: '#000000',
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  registerButtonText: {
    color: '#000',
    fontSize: 15,
  },
  loggedInContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 15,
  },
  welcomeText: {
    fontSize: 16,
    color: '#fff',
    position: 'absolute',
    top: 10,
    left: 10,
    alignItems: 'flex-start',
    fontStyle: 'italic',
  },
});

export default ProfileTab;
