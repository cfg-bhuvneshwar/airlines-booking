import { Text, TouchableWithoutFeedback, View } from 'react-native';

const PassengerCabinSelection = ({
  adults,
  children,
  infants,
  infantsWithSeats,
  cabin,
  onHandleGuestModalPress,
}: any) => {
  return (
    <TouchableWithoutFeedback onPress={onHandleGuestModalPress}>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          marginVertical: 10,
          justifyContent: 'center',
          paddingHorizontal: 15,
          height: 50,
        }}>
        <Text style={{ fontSize: 15 }}>{`${
          adults + children + infants + infantsWithSeats
        } ${
          adults + children + infants + infantsWithSeats > 1
            ? 'guests'
            : 'guest'
        } • ${cabin}`}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PassengerCabinSelection;
