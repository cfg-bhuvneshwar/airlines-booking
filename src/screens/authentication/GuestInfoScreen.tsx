import {
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useAppSelector } from '../../common/hooks/hooks';
import { selectRecentSearchData } from '../../state/flightSlice';
import { useEffect, useState } from 'react';
import { GuestInfoScreenProps } from '../../navigation/types';

const GuestInfoScreen = ({ navigation }: GuestInfoScreenProps) => {
  const recentSearchData = useAppSelector(selectRecentSearchData);

  const [textInputs, setTextInputs] = useState<
    { id: string; firstName: string; lastName: string; title: string }[]
  >([]);
  // const [inputValue, setInputValue] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');

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
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, backgroundColor: '#e9e9e9', padding: 20 }}>
        <Text
          style={{
            fontSize: 17,
          }}>{`${recentSearchData[0].fromCity} -> ${recentSearchData[0].toCity}`}</Text>
        <Text style={{ marginTop: 10, fontSize: 15 }}>
          {recentSearchData[0].date}
        </Text>

        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            borderRadius: 20,
            padding: 20,
            marginVertical: 20,
            borderWidth: 1,
            borderColor: '#fff',
            shadowColor: '#fff',
          }}>
          <Text>Guest Information</Text>
          {textInputs.map((item, index) => (
            <View key={index}>
              <Text style={{ marginTop: 10, fontSize: 15 }}>{item.id}</Text>
              <TextInput
                placeholder="Title"
                onChangeText={text => handleTitleChange(item.id, text)}
                value={item.title}
                style={{
                  borderWidth: 1,
                  marginVertical: 10,
                  padding: 10,
                  borderColor: '#000',
                  borderRadius: 10,
                }}
              />
              <TextInput
                placeholder="First name"
                onChangeText={text => handleFirstNameChange(item.id, text)}
                value={item.firstName}
                style={{
                  borderWidth: 1,
                  marginVertical: 10,
                  padding: 10,
                  borderColor: '#000',
                  borderRadius: 10,
                }}
              />
              <TextInput
                placeholder="Last name"
                onChangeText={text => handleLastNameChange(item.id, text)}
                value={item.lastName}
                style={{
                  borderWidth: 1,
                  marginVertical: 10,
                  padding: 10,
                  borderColor: '#000',
                  borderRadius: 10,
                }}
              />
            </View>
          ))}
          <Text>Contact Information</Text>
          <TextInput
            placeholder="Country code"
            onChangeText={text => setCountryCode(text)}
            value={countryCode}
            style={{
              borderWidth: 1,
              marginVertical: 10,
              padding: 10,
              borderColor: '#000',
              borderRadius: 10,
            }}
          />
          <TextInput
            placeholder="Contact number"
            onChangeText={text => setContactNumber(text)}
            value={contactNumber}
            style={{
              borderWidth: 1,
              marginVertical: 10,
              padding: 10,
              borderColor: '#000',
              borderRadius: 10,
            }}
          />
          <TextInput
            placeholder="Email address"
            onChangeText={text => setEmail(text)}
            value={email}
            style={{
              borderWidth: 1,
              marginVertical: 10,
              padding: 10,
              borderColor: '#000',
              borderRadius: 10,
            }}
          />
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('SeatSelectionScreen')}>
            <View
              style={{
                backgroundColor: '#cac029',
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
                borderRadius: 25,
                marginVertical: 15,
              }}>
              <Text
                style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                Continue
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </ScrollView>
  );
};

export default GuestInfoScreen;
