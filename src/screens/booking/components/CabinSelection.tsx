import { Text, View, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

const CabinSelection = ({
  cabin,
  onPress,
  styles: customStyles,
  selectedCabin,
}: any) => {
  return (
    <View style={[styles.container, customStyles]}>
      <Text style={styles.cabinText}>{cabin}</Text>
      <View style={styles.radioButtonContainer}>
        <RadioButton
          value={cabin}
          status={cabin === selectedCabin ? 'checked' : 'unchecked'}
          onPress={() => onPress(cabin)}
          color="#000"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cabinText: {
    flex: 1,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CabinSelection;
