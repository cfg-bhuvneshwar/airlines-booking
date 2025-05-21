import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import SeatRow from './SeatRow';
import { Colors } from '../../../common/constants/Colors';

interface SeatSelectionProps {
  seats: { seatNumber: number; status: string }[];
  selectedSeats: number[];
  onSelect: (seatNumber: number) => void;
  totalPassengers: number;
  onConfirm: () => void;
  isConfirmDisabled: boolean;
}

const SeatSelection: React.FC<SeatSelectionProps> = ({
  seats,
  selectedSeats,
  onSelect,
  onConfirm,
  isConfirmDisabled,
}) => {
  // Group seats into rows
  const rows = [];
  for (let i = 0; i < seats.length; i += 6) {
    rows.push(seats.slice(i, i + 6)); // Assuming 6 seats per row
  }

  return (
    <View style={styles.mainDeck}>
      <Text>Main deck</Text>
      <Text style={styles.aircraftDirection}>↑ Front of aircraft ↑</Text>
      <View style={styles.rowsContainer}>
        {rows.map((row, index) => (
          <SeatRow
            key={index}
            row={row}
            onSelect={onSelect}
            index={index}
            selectedSeats={selectedSeats}
          />
        ))}
      </View>
      <Text style={styles.aircraftDirection}>↓ Back of aircraft ↓</Text>
      <TouchableWithoutFeedback
        onPress={onConfirm}
        disabled={isConfirmDisabled}>
        <View
          style={[
            styles.confirmButton,
            isConfirmDisabled && { backgroundColor: Colors.disabledButton },
          ]}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  mainDeck: {
    alignItems: 'center',
    marginTop: 20,
  },
  aircraftDirection: {
    marginVertical: 30,
  },
  rowsContainer: {
    marginVertical: 20,
  },
  confirmButton: {
    backgroundColor: Colors.buttonBackground,
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    borderRadius: 25,
    marginVertical: 15,
    marginHorizontal: 20,
    width: '100%',
  },
  confirmButtonText: {
    color: 'white',
  },
});

export default SeatSelection;
