import { Colors } from '../../../common/constants/Colors';
import Header from '../../../common/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { selectBookingData } from '../../../state/bookingSlice';
import { useAppSelector } from '../../../common/hooks/hooks';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

type Booking = {
  oneway?: {
    fromAirportCode: string;
    toAirportCode: string;
    departureTime: string;
    arrivalTime: string;
    cabin: string;
  };
  roundTrip?: {
    fromAirportCode: string;
    toAirportCode: string;
    departureTime: string;
    arrivalTime: string;
    cabin: string;
  };
  totalFare: number;
};

const MyTripsTab = () => {
  const bookingData = useAppSelector(selectBookingData);

  const renderItem = ({ item }: { item: Booking }) => (
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
        <TouchableOpacity style={styles.checkInButton}>
          <Text style={styles.checkInButtonText}>Check-In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <Header title="Trips" />
      <FlatList
        data={bookingData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No bookings available</Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContainer: {
    padding: 16,
  },
  bookingItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
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
    color: '#000',
  },
  checkInButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  checkInButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});

export default MyTripsTab;
