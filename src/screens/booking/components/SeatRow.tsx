import { StyleSheet, View } from 'react-native';
import Seat from './Seat';
import { memo } from 'react';

type Seat = {
  seatNumber: number;
  status: 'available' | 'unavailable' | 'selected';
};

type SeatRowProps = {
  row: Seat[]; // Array of seats in the row
  onSelect: (seatNumber: number) => void; // Callback when a seat is selected
  index: number; // Index of the row
  selectedSeats: number[]; // Array of selected seat numbers
};

const SeatRow = ({ row, onSelect, index, selectedSeats }: SeatRowProps) => (
  <View style={styles.row}>
    {row.map((seat: Seat) => {
      return (
        <View key={seat.seatNumber}>
          <Seat
            key={seat.seatNumber}
            seat={seat}
            onSelect={onSelect}
            rowIndex={index}
            selectedSeat={
              selectedSeats.includes(seat.seatNumber)
                ? { status: 'selected', seatNumber: seat.seatNumber }
                : { status: 'available', seatNumber: seat.seatNumber }
            }
          />
        </View>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  seat: {
    width: 40,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  availableSeat: {
    backgroundColor: '#81bdbf',
  },
  selectedSeat: {
    backgroundColor: '#213650',
  },
  occupiedSeat: {
    backgroundColor: '#e1e1e1',
  },
});

export default memo(SeatRow);
