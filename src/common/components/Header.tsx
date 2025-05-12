import { Text, View } from 'react-native';

const Header = ({ statusBarHeight }: any) => {
  console.log('statusBarHeight :    ', statusBarHeight);

  return (
    <View
      style={{
        marginTop: statusBarHeight,
        justifyContent: 'center',
        height: 50,
      }}>
      <Text
        style={{
          fontSize: 19,
          color: '#fff',
        }}>
        Book
      </Text>
    </View>
  );
};

export default Header;
