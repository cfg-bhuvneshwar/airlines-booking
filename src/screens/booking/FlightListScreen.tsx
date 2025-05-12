import { useEffect, useState } from 'react';
import { FlatList, Text, TouchableWithoutFeedback, View } from 'react-native';
import flights from '../../data/flights.json';
import { FlightListScreenProps } from '../../navigation/types';

const FlightListScreen = ({ navigation, route }: FlightListScreenProps) => {
  const {
    fromAirportCode,
    toAirportCode,
    fromCity,
    toCity,
    date,
    cabin,
    adults,
    children,
    infantsWithSeats,
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
    console.log(flightss);

    setFilteredFlights(flightss);
  }, [fromAirportCode, toAirportCode]);

  const renderItem = ({ item }: any) => {
    let totalFare =
      selectedCabin === 'Economy' ? item.economyFare : item.businessFare;
    console.log('before: ' + totalFare);
    console.log('', adults + children + infantsWithSeats);

    totalFare = totalFare * (adults + children + infantsWithSeats);
    console.log(totalFare);

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('GuestInfoScreen');
        }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            marginVertical: 5,
            borderRadius: 10,
          }}>
          <View style={{ width: '60%', justifyContent: 'center', margin: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 5,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#000',
                }}>
                {item.departureTime}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                }}>
                -----------------------
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#000',
                }}>
                {item.arrivalTime}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 5,
              }}>
              <Text>{item.fromAirportCode}</Text>
              <Text>{`${
                item.numberOfStops > 1
                  ? `${item.numberOfStops} stops`
                  : `${item.numberOfStops} stop`
              } ${item.timeDuration}`}</Text>
              <Text>{item.toAirportCode}</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: '#e1e1e1',
              padding: 10,
              alignItems: 'center',
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            }}>
            <Text
              style={{
                fontSize: 12,
              }}>
              From INR
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#000',
              }}>
              {totalFare}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#e9e9e9', padding: 15 }}>
      <Text style={{ fontSize: 17 }}>{`${fromCity} -> ${toCity}`}</Text>
      <Text style={{ marginTop: 10, fontSize: 15 }}>{date}</Text>

      {selectedCabin === 'Economy' ? (
        <View
          style={{
            flexDirection: 'row',
            borderRadius: 20,
            borderWidth: 1,
            height: 35,
            borderColor: '#000',
            marginVertical: 20,
          }}>
          <View
            style={{
              backgroundColor: '#213650',
              width: '50%',
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ color: 'white' }}>Economy</Text>
          </View>
          <TouchableWithoutFeedback
            onPress={() => setSelectedCabin('Business')}>
            <View
              style={{
                width: '50%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>Business</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            borderRadius: 20,
            borderWidth: 1,
            height: 35,
            borderColor: '#000',
            marginVertical: 20,
          }}>
          <TouchableWithoutFeedback onPress={() => setSelectedCabin('Economy')}>
            <View
              style={{
                width: '50%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>Economy</Text>
            </View>
          </TouchableWithoutFeedback>
          <View
            style={{
              backgroundColor: '#213650',
              width: '50%',
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ color: 'white' }}>Business</Text>
          </View>
        </View>
      )}

      {filteredFlights.length > 0 ? (
        <FlatList data={filteredFlights} renderItem={renderItem} />
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>No flight available!!</Text>
        </View>
      )}
    </View>
  );
};

export default FlightListScreen;
