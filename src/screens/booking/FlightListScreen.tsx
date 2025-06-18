import { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  ListRenderItem,
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
import { pushClickEvent, pushPageloadEvent } from '../../utils/AepUtils';
import FlightsListItem from './components/FlightsListItem';
import { AepPageName } from '../../common/constants/AepConstants';

export type Flight = {
  flightId: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  numberOfStops: number;
  timeDuration: string;
  fromAirportCode: string;
  toAirportCode: string;
  economyFare: number;
  businessFare: number;
  miles: number;
};

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
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);

  useEffect(() => {
    const flightss = flights.filter(
      flight =>
        flight.fromAirportCode === fromAirportCode &&
        flight.toAirportCode === toAirportCode,
    );
    setFilteredFlights(flightss);
  }, [dispatch, fromAirportCode, toAirportCode]);

  useEffect(() => {
    pushPageloadEvent(AepPageName.FLIGHT_SEARCH);
  }, []);

  const onSelectFlight = useCallback(
    (item: Flight, totalFare: number) => {
      if (endDate === '') {
        dispatch(
          saveCurrentBookingData({
            oneway: {
              flightId: item.flightId,
              flightNumber: item.flightNumber,
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
              infants,
              totalFare,
              miles: item.miles,
            },
          }),
        );
        pushClickEvent({
          eventName: 'flightSelect',
          event: {
            flightContext: {
              tripType: 'oneway',
              oneway: {
                flightId: item.flightId,
                flightNumber: item.flightNumber,
                departureTime: item.departureTime,
                arrivalTime: item.arrivalTime,
                numberOfStops: item.numberOfStops,
                timeDuration: item.timeDuration,
                fromAirportCode: item.fromAirportCode,
                toAirportCode: item.toAirportCode,
                economyFare: item.economyFare,
                businessFare: item.businessFare,
                cabinClass: selectedCabin,
                date: startDate,
                totalFare,
                miles: item.miles,
                passengerCount: {
                  adults: adults,
                  children: children,
                  infants: infants + infantsWithSeats,
                },
              },
            },
          },
        });
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
                flightNumber: item.flightNumber,
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
                infants,
                totalFare,
                miles: item.miles,
              },
            }),
          );
          pushClickEvent({
            eventName: 'flightSelect',
            event: {
              flightContext: {
                tripType: 'roundTrip',
                roundTrip: {
                  flightId: item.flightId,
                  flightNumber: item.flightNumber,
                  departureTime: item.departureTime,
                  arrivalTime: item.arrivalTime,
                  numberOfStops: item.numberOfStops,
                  timeDuration: item.timeDuration,
                  fromAirportCode: item.fromAirportCode,
                  toAirportCode: item.toAirportCode,
                  economyFare: item.economyFare,
                  businessFare: item.businessFare,
                  cabinClass: selectedCabin,
                  date: startDate,
                  totalFare,
                  miles: item.miles,
                  passengerCount: {
                    adults: adults,
                    children: children,
                    infants: infants + infantsWithSeats,
                  },
                },
              },
            },
          });
          navigation.navigate('GuestInfoScreen');
        } else {
          dispatch(
            saveCurrentBookingData({
              oneway: {
                flightId: item.flightId,
                flightNumber: item.flightNumber,
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
                infants,
                totalFare,
                miles: item.miles,
              },
            }),
          );
          pushClickEvent({
            eventName: 'flightSelect',
            event: {
              flightContext: {
                tripType: 'oneway',
                oneway: {
                  flightId: item.flightId,
                  flightNumber: item.flightNumber,
                  departureTime: item.departureTime,
                  arrivalTime: item.arrivalTime,
                  numberOfStops: item.numberOfStops,
                  timeDuration: item.timeDuration,
                  fromAirportCode: item.fromAirportCode,
                  toAirportCode: item.toAirportCode,
                  economyFare: item.economyFare,
                  businessFare: item.businessFare,
                  cabinClass: selectedCabin,
                  date: startDate,
                  totalFare,
                  miles: item.miles,
                  passengerCount: {
                    adults: adults,
                    children: children,
                    infants: infants + infantsWithSeats,
                  },
                },
              },
            },
          });
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
    },
    [
      adults,
      cabin,
      children,
      currentBookingData,
      dispatch,
      endDate,
      fromAirportCode,
      fromCity,
      infants,
      infantsWithSeats,
      navigation,
      selectedCabin,
      startDate,
      toAirportCode,
      toCity,
    ],
  );

  const renderItem: ListRenderItem<Flight> = ({ item }) => {
    let totalFare =
      selectedCabin === 'Economy' ? item.economyFare : item.businessFare;
    totalFare = totalFare * (adults + children + infantsWithSeats);

    return (
      <FlightsListItem
        key={item.flightId}
        totalFare={totalFare}
        onSelectFlight={() => onSelectFlight(item, totalFare)}
        item={item}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <Header title="Flights" icon />
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
  cabinSelector: {
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 1,
    height: 35,
    borderColor: Colors.black,
    marginVertical: 20,
  },
  activeCabin: {
    backgroundColor: Colors.background,
    width: '50%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCabinText: {
    color: Colors.white,
  },
  inactiveCabin: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noFlightsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FlightListScreen;
