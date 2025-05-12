import { Text, View } from 'react-native';

const GuestsSelection = ({
  title,
  subTitle,
  onPressMinus,
  onPressPlus,
  value,
  styles,
}: any) => {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
        styles,
      ]}>
      <View style={{ flex: 1 }}>
        {/* <Text>Adults</Text>
        <Text>Age 12+</Text> */}
        <Text>{title}</Text>
        <Text>{subTitle}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text
          style={{
            height: 30,
            width: 30,
            fontSize: 20,
            borderWidth: 1,
            textAlign: 'center',
          }}
          onPress={() => {
            if ((title === 'Adults' && value > 1) || value > 0) {
              onPressMinus(value - 1);
            }
          }}>
          -
        </Text>
        <Text
          style={{
            height: 30,
            width: 30,
            fontSize: 20,
            borderWidth: 1,
            textAlign: 'center',
            marginHorizontal: 10,
          }}>
          {value}
        </Text>
        <Text
          style={{
            height: 30,
            width: 30,
            fontSize: 20,
            borderWidth: 1,
            textAlign: 'center',
          }}
          onPress={() => {
            onPressPlus(value + 1);
          }}>
          +
        </Text>
      </View>
    </View>
  );
};

export default GuestsSelection;
