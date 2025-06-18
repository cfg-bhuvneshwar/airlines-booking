import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SeatRow from './SeatRow';
import { Colors } from '../../../common/constants/Colors';
import ActionButton from '../../../common/components/ActionButton';

export type SeatProps = {
  seatNumber: number;
  status: 'available' | 'unavailable' | 'selected';
};

interface SeatSelectionProps {
  seats: SeatProps[];
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
      <ActionButton
        label="Confirm"
        disabled={isConfirmDisabled}
        buttonViewStyles={[
          styles.confirmButton,
          isConfirmDisabled && { backgroundColor: Colors.disabledButton },
        ]}
        buttonTextStyles={styles.confirmButtonText}
        onPress={onConfirm}
      />
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
    justifyContent: 'center',
    height: 45,
    borderRadius: 25,
    marginVertical: 15,
    marginHorizontal: 20,
    width: '100%',
  },
  confirmButtonText: {
    color: Colors.white,
    fontSize: 16,
  },
});

export default SeatSelection;
