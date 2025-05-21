import { memo } from 'react';
import { Text, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';

type PassengerCabinSelectionProps = {
  adults: number;
  children: number;
  infants: number;
  infantsWithSeats: number;
  cabin: string;
  onHandleGuestModalPress: () => void;
};

const PassengerCabinSelection = ({
  adults,
  children,
  infants,
  infantsWithSeats,
  cabin,
  onHandleGuestModalPress,
}: PassengerCabinSelectionProps) => {
  return (
    <TouchableWithoutFeedback onPress={onHandleGuestModalPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{`${
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: 'center',
    paddingHorizontal: 15,
    height: 50,
  },
  text: {
    fontSize: 15,
  },
});

export default memo(PassengerCabinSelection);
