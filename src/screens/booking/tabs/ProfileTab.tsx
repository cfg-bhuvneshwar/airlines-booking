import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../common/constants/Colors';
import { useAppSelector, useAppDispatch } from '../../../common/hooks/hooks';
import { selectUserData, saveUserData } from '../../../state/userSlice';
import Header from '../../../common/components/Header';
import { fontFamilies } from '../../../common/constants/fontFamily';
import { useCallback, useEffect } from 'react';
import { pushPageloadEvent } from '../../../utils/AepUtils';
import ActionButton from '../../../common/components/ActionButton';
import { AepPageName } from '../../../common/constants/AepConstants';

const ProfileTab = ({ navigation }: any) => {
  const dispatch = useAppDispatch();

  const userData = useAppSelector(selectUserData);

  useEffect(() => {
    pushPageloadEvent(AepPageName.PROFILE);
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(
      saveUserData({
        uid: '',
        title: '',
        firstName: '',
        lastName: '',
        dob: '',
        email: '',
        password: '',
        loyaltyTier: '',
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
  }, [dispatch, navigation]);

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
          <ActionButton
            label="Login"
            buttonViewStyles={styles.loginButton}
            buttonTextStyles={styles.loginButtonText}
            onPress={() => navigation.navigate('LoginScreen')}
          />
          <ActionButton
            label="Create Account"
            buttonViewStyles={styles.registerButton}
            buttonTextStyles={styles.registerButtonText}
            onPress={() => navigation.navigate('RegisterScreen')}
          />
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
                {userData.loyaltyTier} Member
              </Text>
              <Text style={styles.pointsText}>{userData.points} Points</Text>
              <Text style={styles.pointsText}>{userData.miles} miles</Text>
            </View>
          </View>
          <ActionButton
            label="Logout"
            buttonViewStyles={styles.loginButton}
            buttonTextStyles={styles.loginButtonText}
            onPress={handleLogout}
          />
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
    color: Colors.white,
    fontWeight: 'bold',
  },
  pointsText: {
    fontSize: 14,
    color: Colors.white,
  },
  guestContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  guestContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  guestTitle: {
    fontSize: 22,
    color: Colors.black,
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
    justifyContent: 'center',
    height: 45,
    borderRadius: 25,
    marginVertical: 10,
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
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  registerButtonText: {
    color: Colors.black,
    fontSize: 16,
  },
  loggedInContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 15,
  },
  welcomeText: {
    fontSize: 16,
    color: Colors.white,
    position: 'absolute',
    top: 10,
    left: 10,
    alignItems: 'flex-start',
    fontStyle: 'italic',
  },
});

export default ProfileTab;
