import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

const Seat = ({ seat, onSelect, rowIndex, selectedSeat }: any) => {
  const seatStyle = [
    styles.seat,
    seat.status === 'available' && styles.availableSeat,
    selectedSeat.status === 'selected' && styles.selectedSeat,
    seat.status === 'unavailable' && styles.occupiedSeat,
  ];
  return (
    <View>
      {rowIndex === 0 && seat.seatNumber % 6 === 1 ? (
        <Text style={{ alignSelf: 'center' }}>A</Text>
      ) : null}
      {rowIndex === 0 && seat.seatNumber % 6 === 2 ? (
        <Text style={{ alignSelf: 'center' }}>B</Text>
      ) : null}
      {rowIndex === 0 && seat.seatNumber % 6 === 3 ? (
        <Text
          style={{
            alignSelf: 'center',
            marginRight: 40,
          }}>
          C
        </Text>
      ) : null}
      {rowIndex === 0 && seat.seatNumber % 6 === 4 ? (
        <Text style={{ alignSelf: 'center' }}>D</Text>
      ) : null}
      {rowIndex === 0 && seat.seatNumber % 6 === 5 ? (
        <Text style={{ alignSelf: 'center' }}>E</Text>
      ) : null}
      {rowIndex === 0 && seat.seatNumber % 6 === 0 ? (
        <Text style={{ alignSelf: 'center' }}>F</Text>
      ) : null}
      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
        <TouchableWithoutFeedback
          onPress={() => onSelect(seat.seatNumber)}
          disabled={seat.status === 'unavailable'}>
          <View style={seatStyle} />
        </TouchableWithoutFeedback>
        {seat.seatNumber % 6 === 3 ? (
          <View style={[styles.seat]}>
            <Text style={{ fontSize: 16 }}>{rowIndex + 1}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

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

export default Seat;
