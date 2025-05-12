import { Text, TouchableWithoutFeedback, View } from 'react-native';

const FromCityToCity = ({
  from,
  to,
  onHandleFromModalPress,
  onHandleToModalPress,
}: any) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        marginTop: 30,
        paddingHorizontal: 15,
        borderRadius: 10,
      }}>
      <TouchableWithoutFeedback onPress={onHandleFromModalPress}>
        <View
          style={{
            justifyContent: 'center',
            height: 50,
          }}>
          <Text style={{ fontSize: 15 }}>
            {from.city !== '' ? `${from.city} ${from.airportCode}` : 'From'}
          </Text>
        </View>
      </TouchableWithoutFeedback>

      <View style={{ height: 0.5, backgroundColor: 'grey' }} />

      <TouchableWithoutFeedback onPress={onHandleToModalPress}>
        <View
          style={{
            justifyContent: 'center',
            height: 50,
          }}>
          <Text style={{ fontSize: 15 }}>
            {to.city !== '' ? `${to.city} ${to.airportCode}` : 'To'}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default FromCityToCity;
