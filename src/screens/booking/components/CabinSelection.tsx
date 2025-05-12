import { Text, View } from 'react-native';
import { RadioButton } from 'react-native-paper';

const CabinSelection = ({ cabin, onPress, styles, selectedCabin }: any) => {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
        },
        styles,
      ]}>
      <Text style={{ flex: 1 }}>{cabin}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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

export default CabinSelection;
