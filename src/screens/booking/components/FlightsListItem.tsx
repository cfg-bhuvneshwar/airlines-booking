import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Flight } from '../FlightListScreen';
import { Colors } from '../../../common/constants/Colors';

type FlightsListItemProps = {
  item: Flight;
  onSelectFlight: () => void;
  totalFare: number;
};

const FlightsListItem = ({
  item,
  onSelectFlight,
  totalFare,
}: FlightsListItemProps) => {
  return (
    <TouchableWithoutFeedback onPress={onSelectFlight}>
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

const styles = StyleSheet.create({
  flightCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
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
    color: Colors.black,
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
    color: Colors.black,
  },
  noFlightsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FlightsListItem;
