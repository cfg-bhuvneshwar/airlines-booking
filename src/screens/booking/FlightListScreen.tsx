import { useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';
import flights from '../../data/flights.json';
import { FlightListScreenProps } from '../../navigation/types';
import { formatDate } from '../../utils/Utils';
import { Colors } from '../../common/constants/Colors';
import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import {
  saveCurrentBookingData,
  selectCurrentBooking,
} from '../../state/flightSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../common/components/Header';

const FlightListScreen = ({ navigation, route }: FlightListScreenProps) => {
  const dispatch = useAppDispatch();
  const currentBookingData = useAppSelector(selectCurrentBooking);

  const {
    fromAirportCode,
    toAirportCode,
    fromCity,
    toCity,
    startDate,
    endDate,
    cabin,
    adults,
    children,
    infantsWithSeats,
    infants,
  } = route.params;

  const [selectedCabin, setSelectedCabin] = useState(cabin);
  const [filteredFlights, setFilteredFlights] = useState<
    {
      departureTime: string;
      arrivalTime: string;
      numberOfStops: number;
      timeDuration: string;
      fromAirportCode: string;
      toAirportCode: string;
    }[]
  >([]);

  useEffect(() => {
    const flightss = flights.filter(
      flight =>
        flight.fromAirportCode === fromAirportCode &&
        flight.toAirportCode === toAirportCode,
    );
    setFilteredFlights(flightss);
  }, [dispatch, fromAirportCode, toAirportCode]);

  const renderItem = ({ item }: any) => {
    let totalFare =
      selectedCabin === 'Economy' ? item.economyFare : item.businessFare;
    totalFare = totalFare * (adults + children + infantsWithSeats);

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          if (endDate === '') {
            dispatch(
              saveCurrentBookingData({
                oneway: {
                  flightId: item.flightId,
                  departureTime: item.departureTime,
                  arrivalTime: item.arrivalTime,
                  numberOfStops: item.numberOfStops,
                  timeDuration: item.timeDuration,
                  fromAirportCode: item.fromAirportCode,
                  toAirportCode: item.toAirportCode,
                  economyFare: item.economyFare,
                  businessFare: item.businessFare,
                  cabin: selectedCabin,
                  date: startDate,
                  adults,
                  children,
                  infantsWithSeats,
                  totalFare,
                  miles: item.miles,
                },
              }),
            );
            navigation.navigate('GuestInfoScreen');
          } else {
            if (
              currentBookingData &&
              currentBookingData.oneway &&
              Object.keys(currentBookingData.oneway).length > 0
            ) {
              dispatch(
                saveCurrentBookingData({
                  roundTrip: {
                    flightId: item.flightId,
                    departureTime: item.departureTime,
                    arrivalTime: item.arrivalTime,
                    numberOfStops: item.numberOfStops,
                    timeDuration: item.timeDuration,
                    fromAirportCode: item.fromAirportCode,
                    toAirportCode: item.toAirportCode,
                    economyFare: item.economyFare,
                    businessFare: item.businessFare,
                    cabin: selectedCabin,
                    adults,
                    date: startDate,
                    children,
                    infantsWithSeats,
                    totalFare,
                    miles: item.miles,
                  },
                }),
              );
              navigation.navigate('GuestInfoScreen');
            } else {
              dispatch(
                saveCurrentBookingData({
                  oneway: {
                    flightId: item.flightId,
                    departureTime: item.departureTime,
                    arrivalTime: item.arrivalTime,
                    numberOfStops: item.numberOfStops,
                    timeDuration: item.timeDuration,
                    fromAirportCode: item.fromAirportCode,
                    toAirportCode: item.toAirportCode,
                    economyFare: item.economyFare,
                    businessFare: item.businessFare,
                    cabin: selectedCabin,
                    date: startDate,
                    adults,
                    children,
                    infantsWithSeats,
                    totalFare,
                    miles: item.miles,
                  },
                }),
              );
              navigation.replace('FlightListScreen', {
                fromCity: toCity,
                toCity: fromCity,
                fromAirportCode: toAirportCode,
                toAirportCode: fromAirportCode,
                cabin: cabin,
                startDate: endDate,
                endDate: startDate,
                adults,
                children,
                infantsWithSeats,
                infants,
              });
            }
          }
        }}>
        <View style={styles.flightCard}>
          <View style={styles.flightDetails}>
            <View style={styles.flightTimes}>
              <Text style={styles.flightTimeText}>{item.departureTime}</Text>
              <Text style={styles.flightDuration}>-----------------------</Text>
              <Text style={styles.flightTimeText}>{item.arrivalTime}</Text>
            </View>
            <View style={styles.flightInfo}>
              <Text>{item.fromAirportCode}</Text>
              <Text>{`${
                item.numberOfStops > 1
                  ? `${item.numberOfStops} stops`
                  : `${item.numberOfStops} stop`
              } ${item.timeDuration}`}</Text>
              <Text>{item.toAirportCode}</Text>
            </View>
          </View>
          <View style={styles.fareContainer}>
            <Text style={styles.fareLabel}>From INR</Text>
            <Text style={styles.fareAmount}>{totalFare}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <Header title="Flights" />
      <View style={styles.content}>
        <Text style={styles.routeText}>{`${fromCity} -> ${toCity}`}</Text>
        <Text style={styles.dateText}>{formatDate(startDate)}</Text>
        <Text style={styles.dateText}>
          {endDate === ''
            ? '(Outbound Flight)'
            : currentBookingData &&
              currentBookingData.oneway &&
              Object.keys(currentBookingData.oneway).length > 0
            ? '(Return Flight)'
            : '(Outbound Flight)'}
        </Text>

        {selectedCabin === 'Economy' ? (
          <View style={styles.cabinSelector}>
            <View style={styles.activeCabin}>
              <Text style={styles.activeCabinText}>Economy</Text>
            </View>
            <TouchableWithoutFeedback
              onPress={() => setSelectedCabin('Business')}>
              <View style={styles.inactiveCabin}>
                <Text>Business</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        ) : (
          <View style={styles.cabinSelector}>
            <TouchableWithoutFeedback
              onPress={() => setSelectedCabin('Economy')}>
              <View style={styles.inactiveCabin}>
                <Text>Economy</Text>
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.activeCabin}>
              <Text style={styles.activeCabinText}>Business</Text>
            </View>
          </View>
        )}

        {filteredFlights.length > 0 ? (
          <FlatList data={filteredFlights} renderItem={renderItem} />
        ) : (
          <View style={styles.noFlightsContainer}>
            <Text>No flight available!!</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    backgroundColor: '#e9f4f4',
    padding: 15,
  },
  routeText: {
    fontSize: 17,
  },
  dateText: {
    marginTop: 10,
    fontSize: 15,
  },
  cabinSelector: {
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 1,
    height: 35,
    borderColor: '#000',
    marginVertical: 20,
  },
  activeCabin: {
    backgroundColor: '#213650',
    width: '50%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCabinText: {
    color: 'white',
  },
  inactiveCabin: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flightCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginVertical: 5,
    borderRadius: 10,
  },
  flightDetails: {
    width: '60%',
    justifyContent: 'center',
    margin: 10,
  },
  flightTimes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  flightTimeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  flightDuration: {
    fontSize: 15,
  },
  flightInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  fareContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#e1e1e1',
    padding: 10,
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  fareLabel: {
    fontSize: 12,
  },
  fareAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  noFlightsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FlightListScreen;
