import React, { useState, useCallback, useRef } from 'react';
import { Modal, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RegisterScreenProps } from '../../navigation/types';
import { UserData } from '../../utils/types';
import { useAppDispatch } from '../../common/hooks/hooks';
import { saveRegisterData, saveUserData } from '../../state/userSlice';
import { Colors } from '../../common/constants/Colors';

import { Calendar } from 'react-native-calendars';
import { formatDateDob, generate16DigitId } from '../../utils/Utils';
import Header from '../../common/components/Header';
import TitleSelection from '../../common/components/TitleSelection';
import ActionButton from '../../common/components/ActionButton';
import CustomKeyboardAvoidingView from '../../common/components/CustomKeyboardAvoidingView';

const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const dispatch = useAppDispatch();

  const maxDate = useRef(new Date().toISOString().split('T')[0]);
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [title, setTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDateSelect = useCallback((date: any) => {
    setDob(date.dateString);
    setIsModalVisible(false);
  }, []);

  const handleRegister = useCallback(async () => {
    const user: UserData = {
      uid: generate16DigitId(),
      title,
      firstName,
      lastName,
      dob,
      email,
      password,
      loyaltyTier: 'Silver',
      points: 0,
      bookings: 0,
      miles: 0,
      contactNumber,
    };
    dispatch(saveRegisterData(user));
    dispatch(saveUserData(user));
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeScreen' }],
    });
  }, [
    title,
    firstName,
    lastName,
    dob,
    email,
    password,
    contactNumber,
    dispatch,
    navigation,
  ]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <Header title="Create Account" icon />
      {isModalVisible && (
        <Modal visible={isModalVisible} animationType="none" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Calendar
                onDayPress={handleDateSelect}
                maxDate={maxDate.current}
              />
            </View>
          </View>
        </Modal>
      )}
      <CustomKeyboardAvoidingView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.contentContainer}>
          <View style={styles.form}>
            <TitleSelection
              title={title}
              onChange={({ label }: { label: string }) => setTitle(label)}
              dropdown={styles.dropdown}
              selectedTextStyle={styles.selectedTextStyle}
            />
            <TextInput
              placeholder="First name"
              value={firstName}
              onChangeText={setFirstName}
              style={styles.input}
            />
            <TextInput
              placeholder="Last name"
              value={lastName}
              onChangeText={setLastName}
              style={styles.input}
            />
            <TextInput
              onFocus={() => setIsModalVisible(true)}
              placeholder="Date of birth"
              value={dob !== '' ? formatDateDob(dob) : dob}
              style={styles.input}
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <TextInput
              placeholder="Contact Number"
              value={contactNumber}
              onChangeText={setContactNumber}
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />
            <ActionButton
              label="Register"
              buttonViewStyles={styles.registerButton}
              buttonTextStyles={styles.registerButtonText}
              onPress={handleRegister}
            />
          </View>
        </ScrollView>
      </CustomKeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
  },
  form: {
    flex: 1,
    padding: 25,
    backgroundColor: Colors.white,
  },
  dropdown: {
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    borderColor: Colors.black,
    borderRadius: 10,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  registerButton: {
    marginTop: 35,
    backgroundColor: Colors.buttonBackground,
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    borderRadius: 25,
  },
  registerButtonText: {
    color: Colors.white,
    fontSize: 16,
  },
});

export default RegisterScreen;
