import { Text, TouchableOpacity, View } from 'react-native';

const ProfileTab = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        }}>
        <Text style={{ fontSize: 22, color: '#000' }}>Join Guest</Text>
        <Text
          style={{
            fontSize: 17,
            color: 'grey',
            marginTop: 10,
            textAlign: 'center',
          }}>
          Collect miles and unlock exclusive benefits available only to Guest
          members
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('LoginScreen');
        }}
        style={{
          backgroundColor: '#cac029',
          alignItems: 'center',
          height: 45,
          justifyContent: 'center',
          borderRadius: 25,
          margin: 15,
        }}>
        <Text style={{ color: 'white', fontSize: 15 }}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('RegisterScreen');
        }}
        style={{
          alignItems: 'center',
          height: 45,
          justifyContent: 'center',
          borderRadius: 25,
          borderColor: '#000000',
          marginTop: 5,
          marginBlock: 10,
          marginHorizontal: 15,
          borderWidth: 1,
        }}>
        <Text style={{ color: '#000', fontSize: 15 }}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileTab;
