import { StyleSheet, Text, View } from 'react-native';
import ActionButton from '../../../common/components/ActionButton';
import { Colors } from '../../../common/constants/Colors';
import { Booking } from '../tabs/MyTripsTab';

type MyTripsListItemProps = {
  item: Booking;
};

const MyTripsListItem = ({ item }: MyTripsListItemProps) => {
  return (
    <View style={styles.bookingItem}>
      {/* Oneway Trip Details */}
      {item.oneway && (
        <>
          <Text
            style={
              styles.title
            }>{`${item.oneway.fromAirportCode} -> ${item.oneway.toAirportCode}`}</Text>
          <Text>{`Departure: ${item.oneway.departureTime}`}</Text>
          <Text>{`Arrival: ${item.oneway.arrivalTime}`}</Text>
          <Text>{`Cabin: ${item.oneway.cabin}`}</Text>
        </>
      )}

      {/* Round Trip Details */}
      {item.roundTrip && (
        <>
          <Text
            style={[
              styles.title,
              styles.roundTripTitle,
            ]}>{`${item.roundTrip.fromAirportCode} -> ${item.roundTrip.toAirportCode}`}</Text>
          <Text>{`Departure: ${item.roundTrip.departureTime}`}</Text>
          <Text>{`Arrival: ${item.roundTrip.arrivalTime}`}</Text>
          <Text>{`Cabin: ${item.roundTrip.cabin}`}</Text>
        </>
      )}

      {/* Total Fare and Check-In Button */}
      <View style={styles.footer}>
        <Text style={styles.totalFare}>{`Total Fare: ₹${item.totalFare}`}</Text>
        <ActionButton
          label="Check-In"
          buttonViewStyles={styles.checkInButton}
          buttonTextStyles={styles.checkInButtonText}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bookingItem: {
    backgroundColor: Colors.white,
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  roundTripTitle: {
    marginTop: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  totalFare: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.black,
  },
  checkInButton: {
    backgroundColor: Colors.buttonBackground,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  checkInButtonText: {
    color: Colors.white,
    fontSize: 16,
  },
});

export default MyTripsListItem;
