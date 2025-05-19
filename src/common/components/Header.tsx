import { Text, View, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { fontFamilies } from '../constants/fontFamily';

const Header = ({ title }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    color: Colors.light,
    fontFamily: fontFamilies.SemiBold,
  },
});

export default Header;
