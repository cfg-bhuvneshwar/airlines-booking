import { memo } from 'react';
import { Text, View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { RadioButton } from 'react-native-paper';

type CabinSelectionProps = {
  cabin: string;
  onPress: (cabin: string) => void;
  styles?: StyleProp<ViewStyle>;
  selectedCabin: string;
};

const CabinSelection = ({
  cabin,
  onPress,
  styles: customStyles,
  selectedCabin,
}: CabinSelectionProps) => {
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

export default memo(CabinSelection);
