import { StatusBar, Text, View } from 'react-native';
import { Colors } from '../../../common/constants/Colors';

const Home = () => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <View
        style={{
          marginTop: StatusBar.currentHeight,
          justifyContent: 'center',
          height: 50,
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 19,
            color: Colors.light,
          }}>
          Coforge Airlines
        </Text>
      </View>
    </View>
  );
};

export default Home;
