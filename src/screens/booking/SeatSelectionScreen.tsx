import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SeatSelectionScreenProps } from '../../navigation/types';
import { useEffect, useState } from 'react';
import SeatRow from './components/SeatRow';
import { Colors } from '../../common/constants/Colors';
import { useAppSelector } from '../../common/hooks/hooks';
import { selectRecentSearchData } from '../../state/flightSlice';

const SeatSelectionScreen = ({ navigation }: SeatSelectionScreenProps) => {
  const recentSearchData = useAppSelector(selectRecentSearchData);

  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [seats, setSeats] = useState<{ seatNumber: number; status: string }[]>(
    [],
  );

  useEffect(() => {
    const seatArr = [];
    for (let seat = 0; seat < 120; seat++) {
      const status = Math.random() > 0.3 ? 'available' : 'unavailable';
      seatArr.push({ seatNumber: seat + 1, status });
    }
    setSeats(seatArr);
  }, []);

  console.log(selectedSeats);

  const handleSeatSelect = (seatNumber: number) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(value => value !== seatNumber));
    } else {
      if (
        selectedSeats.length <
        recentSearchData[0].adults +
          recentSearchData[0].children +
          recentSearchData[0].infantsWithSeats
      ) {
        setSelectedSeats([...selectedSeats, seatNumber]);
      } else {
        console.log('Seats selected');
      }
    }
  };

  // Group seats into rows
  const rows = [];
  for (let i = 0; i < seats.length; i += 6) {
    rows.push(seats.slice(i, i + 6)); // Assuming 6 seats per row
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>Window or aisle?</Text>
        <Text>Book your seat now</Text>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text>Main deck</Text>
          <Text style={{ marginVertical: 30 }}>↑ Front of aircraft ↑</Text>
          <View style={{ marginVertical: 20 }}>
            {rows.map((row, index) => (
              <SeatRow
                key={index}
                row={row}
                onSelect={handleSeatSelect}
                index={index}
                selectedSeats={selectedSeats}
              />
            ))}
          </View>
          <Text style={{ marginVertical: 30 }}>↓ Back of aircraft ↓</Text>

          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('PaymentScreen');
            }}
            disabled={
              selectedSeats.length <
              recentSearchData[0].adults +
                recentSearchData[0].children +
                recentSearchData[0].infantsWithSeats
            }>
            <View
              style={{
                backgroundColor: Colors.buttonBackground,
                alignItems: 'center',
                height: 45,
                justifyContent: 'center',
                borderRadius: 25,
                marginVertical: 15,
                marginHorizontal: 20,
                width: '100%',
              }}>
              <Text style={{ color: 'white' }}>Confirm</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  seat: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  availableSeat: {
    backgroundColor: 'green',
  },
  selectedSeat: {
    backgroundColor: 'blue',
  },
  occupiedSeat: {
    backgroundColor: 'gray',
  },
});

export default SeatSelectionScreen;
