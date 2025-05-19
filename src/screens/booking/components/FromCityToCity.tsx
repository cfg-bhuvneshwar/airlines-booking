import { Text, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';

const FromCityToCity = ({
  from,
  to,
  onHandleFromModalPress,
  onHandleToModalPress,
}: any) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onHandleFromModalPress}>
        <View style={styles.cityContainer}>
          <Text style={styles.cityText}>
            {from.city !== '' ? `${from.city} ${from.airportCode}` : 'From'}
          </Text>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.divider} />

      <TouchableWithoutFeedback onPress={onHandleToModalPress}>
        <View style={styles.cityContainer}>
          <Text style={styles.cityText}>
            {to.city !== '' ? `${to.city} ${to.airportCode}` : 'To'}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 30,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  cityContainer: {
    justifyContent: 'center',
    height: 50,
  },
  cityText: {
    fontSize: 15,
  },
  divider: {
    height: 0.5,
    backgroundColor: 'grey',
  },
});

export default FromCityToCity;
