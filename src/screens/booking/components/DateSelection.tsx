import { Text, TouchableWithoutFeedback, View } from 'react-native';

const DateSelection = ({ onHandleDateModalPress, date }) => {
  return (
    <TouchableWithoutFeedback onPress={onHandleDateModalPress}>
      <View
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 15,
          borderRadius: 10,
          marginBottom: 20,
          justifyContent: 'center',
          height: 50,
        }}>
        <Text style={{ fontSize: 15 }}>{date ? date : 'Dates'}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DateSelection;
