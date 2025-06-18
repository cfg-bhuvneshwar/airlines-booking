import { Colors } from '../../../common/constants/Colors';
import Header from '../../../common/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { selectBookingData } from '../../../state/bookingSlice';
import { useAppSelector } from '../../../common/hooks/hooks';
import { FlatList, Text, StyleSheet, ListRenderItem } from 'react-native';
import { useEffect } from 'react';
import { pushPageloadEvent } from '../../../utils/AepUtils';
import MyTripsListItem from '../components/MyTripsListItem';
import { AepPageName } from '../../../common/constants/AepConstants';

export type Booking = {
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

  useEffect(() => {
    pushPageloadEvent(AepPageName.TRIPS);
  }, []);

  const renderItem: ListRenderItem<Booking> = ({ item }) => (
    <MyTripsListItem item={item} />
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
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});

export default MyTripsTab;
