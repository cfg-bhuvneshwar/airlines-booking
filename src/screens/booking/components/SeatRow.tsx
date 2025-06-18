import { StyleSheet, View } from 'react-native';
import { memo } from 'react';
import { SeatProps } from './SeatSelection';
import Seat from './Seat';

type SeatRowProps = {
  row: SeatProps[]; // Array of seats in the row
  onSelect: (seatNumber: number) => void; // Callback when a seat is selected
  index: number; // Index of the row
  selectedSeats: number[]; // Array of selected seat numbers
};

const SeatRow = ({ row, onSelect, index, selectedSeats }: SeatRowProps) => (
  <View style={styles.container}>
    {row.map((seat: SeatProps) => {
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
    flexDirection: 'row',
    marginVertical: 5,
  },
});

export default memo(SeatRow);
