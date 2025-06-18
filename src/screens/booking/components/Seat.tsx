import { memo } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Colors } from '../../../common/constants/Colors';

type SeatProps = {
  seat: {
    seatNumber: number;
    status: 'available' | 'unavailable' | 'selected';
  }; // Represents the seat details
  onSelect: (seatNumber: number) => void; // Callback when a seat is selected
  rowIndex: number; // The row index of the seat
  selectedSeat: {
    seatNumber: number;
    status: 'available' | 'unavailable' | 'selected';
  }; // Represents the currently selected seat
};

const Seat = ({ seat, onSelect, rowIndex, selectedSeat }: SeatProps) => {
  const seatStyle = [
    styles.seatStyle,
    seat.status === 'available' && styles.availableSeat,
    selectedSeat.status === 'selected' && styles.selectedSeat,
    seat.status === 'unavailable' && styles.occupiedSeat,
  ];

  return (
    <View>
      {rowIndex === 0 && seat.seatNumber % 6 === 1 ? (
        <Text style={styles.seatLabel}>A</Text>
      ) : null}
      {rowIndex === 0 && seat.seatNumber % 6 === 2 ? (
        <Text style={styles.seatLabel}>B</Text>
      ) : null}
      {rowIndex === 0 && seat.seatNumber % 6 === 3 ? (
        <Text style={styles.seatLabel}>C</Text>
      ) : null}
      {rowIndex === 0 && seat.seatNumber % 6 === 4 ? (
        <Text style={styles.seatLabel}>D</Text>
      ) : null}
      {rowIndex === 0 && seat.seatNumber % 6 === 5 ? (
        <Text style={styles.seatLabel}>E</Text>
      ) : null}
      {rowIndex === 0 && seat.seatNumber % 6 === 0 ? (
        <Text style={styles.seatLabel}>F</Text>
      ) : null}
      <View style={styles.seatRow}>
        <TouchableWithoutFeedback
          onPress={() => onSelect(seat.seatNumber)}
          disabled={seat.status === 'unavailable'}>
          <View style={seatStyle} />
        </TouchableWithoutFeedback>
        {seat.seatNumber % 6 === 3 ? (
          <View
            style={{
              width: 30,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.seatNumberText}>{rowIndex + 1}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  seatStyle: {
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
    backgroundColor: Colors.background,
  },
  occupiedSeat: {
    backgroundColor: '#e1e1e1',
  },
  seatLabel: {
    width: 40,
    borderRadius: 5,
    textAlign: 'center',
    marginHorizontal: 2,
    fontWeight: 'bold',
  },
  seatLabelMarginRight: {
    marginRight: 40,
  },
  seatRow: {
    flexDirection: 'row',
    // alignItems: 'center',
    // backgroundColor: 'green',
    marginVertical: 5,
  },
  seatNumberContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  seatNumberText: {
    fontSize: 16,
  },
});

export default memo(Seat);
