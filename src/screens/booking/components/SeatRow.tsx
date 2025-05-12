import { StyleSheet, View } from 'react-native';
import Seat from './Seat';

const SeatRow = ({ row, onSelect, index, selectedSeats }: any) => (
  <View style={styles.row}>
    {row.map((seat: any) => {
      return (
        <View key={seat.seatNumber}>
          <Seat
            key={seat.seatNumber}
            seat={seat}
            onSelect={onSelect}
            rowIndex={index}
            selectedSeat={
              selectedSeats.includes(seat.seatNumber)
                ? { status: 'selected' }
                : {}
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

export default SeatRow;
