import React, {
  useState,
  useCallback,
  useRef,
  useReducer,
  useEffect,
} from 'react';
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

const initialState = {
  title: '',
  firstName: '',
  lastName: '',
  email: '',
  contactNumber: '',
  dob: '',
  password: '',
  isFormValid: false,
};

const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const dispatch = useAppDispatch();

  const maxDate = useRef(new Date().toISOString().split('T')[0]);

  const signupReducer = (
    state: {
      title: string;
      firstName: string;
      lastName: string;
      email: string;
      contactNumber: string;
      dob: string;
      password: string;
      isFormValid: boolean;
    },
    action: { type: string; payload?: any },
  ) => {
    switch (action.type) {
      case 'SET_FIELD':
        return {
          ...state,
          [action.payload.field]: action.payload.value,
        };
      case 'VALIDATE_FORM':
        const {
          firstName,
          lastName,
          email,
          password,
          contactNumber,
          dob,
          title,
        } = state;
        const isValid =
          firstName.length > 0 &&
          lastName.length > 0 &&
          email.includes('@') &&
          dob !== '' &&
          password.length >= 6 &&
          contactNumber.length > 0 &&
          title !== '';
        console.log(isValid);

        return {
          ...state,
          isFormValid: isValid,
        };
      default:
        return state;
    }
  };

  const [formState, formDispatch] = useReducer(signupReducer, initialState);
  const {
    title,
    firstName,
    lastName,
    email,
    contactNumber,
    dob,
    password,
    isFormValid,
  } = formState;

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    formDispatch({ type: 'VALIDATE_FORM' });
  }, [
    formDispatch,
    firstName,
    lastName,
    email,
    contactNumber,
    dob,
    title,
    password,
  ]);

  const handleDateSelect = useCallback((date: any) => {
    formDispatch({
      type: 'SET_FIELD',
      payload: {
        field: 'dob',
        value: date.dateString,
      },
    });
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
              onChange={({ label }: { label: string }) => {
                formDispatch({
                  type: 'SET_FIELD',
                  payload: {
                    field: 'title',
                    value: label,
                  },
                });
              }}
              dropdown={styles.dropdown}
              selectedTextStyle={styles.selectedTextStyle}
            />
            <TextInput
              placeholder="First name"
              autoCapitalize="words"
              value={firstName}
              onChangeText={text => {
                formDispatch({
                  type: 'SET_FIELD',
                  payload: {
                    field: 'firstName',
                    value: text.trim(),
                  },
                });
              }}
              style={styles.input}
            />
            <TextInput
              placeholder="Last name"
              autoCapitalize="words"
              value={lastName}
              onChangeText={text => {
                formDispatch({
                  type: 'SET_FIELD',
                  payload: {
                    field: 'lastName',
                    value: text.trim(),
                  },
                });
              }}
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
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={text => {
                formDispatch({
                  type: 'SET_FIELD',
                  payload: {
                    field: 'email',
                    value: text,
                  },
                });
              }}
              style={styles.input}
            />
            <TextInput
              placeholder="Contact Number"
              value={contactNumber}
              keyboardType="phone-pad"
              onChangeText={text => {
                formDispatch({
                  type: 'SET_FIELD',
                  payload: {
                    field: 'contactNumber',
                    value: text,
                  },
                });
              }}
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={text => {
                formDispatch({
                  type: 'SET_FIELD',
                  payload: {
                    field: 'password',
                    value: text,
                  },
                });
              }}
              secureTextEntry
              style={styles.input}
            />
            <ActionButton
              label="Register"
              buttonViewStyles={[
                styles.registerButton,
                !isFormValid && { backgroundColor: Colors.disabledButton },
              ]}
              buttonTextStyles={styles.registerButtonText}
              onPress={handleRegister}
              disabled={!isFormValid}
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
