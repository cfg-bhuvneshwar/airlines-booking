import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import {
  saveCurrentBookingData,
  selectRecentSearchData,
} from '../../state/flightSlice';
import { useEffect, useState } from 'react';
import { GuestInfoScreenProps } from '../../navigation/types';
import { formatDate, showToastOrAlert } from '../../utils/Utils';
import { Colors } from '../../common/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../common/components/Header';
import { selectUserData } from '../../state/userSlice';
import TitleSelection from '../../common/components/TitleSelection';

const GuestInfoScreen = ({ navigation }: GuestInfoScreenProps) => {
  const dispatch = useAppDispatch();
  const recentSearchData = useAppSelector(selectRecentSearchData);
  const userData = useAppSelector(selectUserData);

  const [textInputs, setTextInputs] = useState<
    { id: string; firstName: string; lastName: string; title: string }[]
  >([]);
  const [contactNumber, setContactNumber] = useState(
    userData.contactNumber ? userData.contactNumber : '',
  );
  const [email, setEmail] = useState(userData.email ? userData.email : '');

  useEffect(() => {
    let initialInputs = [];
    for (let i = 0; i < recentSearchData[0].adults; i++) {
      initialInputs.push({
        id: `Adult ${i + 1}`,
        firstName: '',
        lastName: '',
        title: '',
      });
    }

    for (let i = 0; i < recentSearchData[0].children; i++) {
      initialInputs.push({
        id: `Child ${i + 1}`,
        firstName: '',
        lastName: '',
        title: '',
      });
    }

    for (
      let i = 0;
      i < recentSearchData[0].infants + recentSearchData[0].infantsWithSeats;
      i++
    ) {
      initialInputs.push({
        id: `Infant ${i + 1}`,
        firstName: '',
        lastName: '',
        title: '',
      });
    }

    setTextInputs(initialInputs);
  }, [recentSearchData]);

  const handleTitleChange = (id: string, text: string) => {
    const updatedInputs = textInputs.map(input =>
      input.id === id ? { ...input, title: text } : input,
    );
    setTextInputs(updatedInputs);
  };

  const handleFirstNameChange = (id: string, text: string) => {
    const updatedInputs = textInputs.map(input =>
      input.id === id ? { ...input, firstName: text } : input,
    );
    setTextInputs(updatedInputs);
  };

  const handleLastNameChange = (id: string, text: string) => {
    const updatedInputs = textInputs.map(input =>
      input.id === id ? { ...input, lastName: text } : input,
    );
    setTextInputs(updatedInputs);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Header title="Guest Information" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <Text
            style={
              styles.routeText
            }>{`${recentSearchData[0].fromCity} -> ${recentSearchData[0].toCity}`}</Text>
          <Text style={styles.dateText}>
            {recentSearchData[0].endDate !== ''
              ? `${formatDate(recentSearchData[0].startDate)} - ${formatDate(
                  recentSearchData[0].endDate,
                )}`
              : `${formatDate(recentSearchData[0].startDate)}`}
          </Text>
          <View style={styles.guestInfoContainer}>
            <Text style={styles.sectionTitle}>Guest Information</Text>
            {textInputs.map((item, index) => (
              <View key={index}>
                <Text style={styles.inputLabel}>{item.id}</Text>
                {/* <Dropdown
                  style={styles.dropdown}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={userTitles}
                  maxHeight={300}
                  labelField="label"
                  valueField="label"
                  placeholder={'Title'}
                  value={item.title}
                  onChange={({ label }) => handleTitleChange(item.id, label)}
                /> */}

                <TitleSelection
                  title={item.title}
                  onChange={({ label }: { label: string }) =>
                    handleTitleChange(item.id, label)
                  }
                  dropdown={styles.dropdown}
                  selectedTextStyle={styles.selectedTextStyle}
                />
                <TextInput
                  placeholder="First name"
                  onChangeText={text => handleFirstNameChange(item.id, text)}
                  value={item.firstName}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Last name"
                  onChangeText={text => handleLastNameChange(item.id, text)}
                  value={item.lastName}
                  style={styles.input}
                />
              </View>
            ))}
            <Text style={styles.sectionTitle}>Contact Information</Text>
            <TextInput
              placeholder="Contact number"
              onChangeText={text => setContactNumber(text)}
              value={contactNumber}
              style={styles.input}
            />
            <TextInput
              placeholder="Email address"
              onChangeText={text => setEmail(text)}
              value={email}
              style={styles.input}
            />
            <TouchableWithoutFeedback
              onPress={() => {
                if (contactNumber === '') {
                  showToastOrAlert('Enter contact number');
                } else if (email === '') {
                  showToastOrAlert('Enter email');
                } else {
                  dispatch(
                    saveCurrentBookingData({
                      guestInformation: textInputs,
                      contactNumber,
                      email,
                    }),
                  );
                  navigation.navigate('SeatSelectionScreen');
                }
              }}>
              <View style={styles.continueButton}>
                <Text style={styles.continueButtonText}>Continue</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#e9e9e9',
    padding: 20,
  },
  routeText: {
    fontSize: 17,
  },
  dateText: {
    marginTop: 10,
    fontSize: 15,
  },
  guestInfoContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#fff',
    shadowColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  inputLabel: {
    marginTop: 10,
    fontSize: 15,
  },
  dropdown: {
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    borderColor: '#000',
    borderRadius: 10,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    borderColor: '#000',
    borderRadius: 10,
  },
  continueButton: {
    backgroundColor: '#cac029',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 25,
    marginVertical: 15,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GuestInfoScreen;
