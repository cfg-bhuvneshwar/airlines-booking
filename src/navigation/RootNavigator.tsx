import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/authentication/LoginScreen';
import RegisterScreen from '../screens/authentication/RegisterScreen';
import HomeScreen from '../screens/booking/HomeScreen';
import FlightListScreen from '../screens/booking/FlightListScreen';
import SeatSelectionScreen from '../screens/booking/SeatSelectionScreen';
import GuestInfoScreen from '../screens/authentication/GuestInfoScreen';
import PaymentScreen from '../screens/booking/PaymentScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FlightListScreen"
        component={FlightListScreen}
        options={{ title: 'Flights' }}
      />
      <Stack.Screen
        name="SeatSelectionScreen"
        component={SeatSelectionScreen}
        options={{ title: 'Choose your seat' }}
      />
      <Stack.Screen
        name="GuestInfoScreen"
        component={GuestInfoScreen}
        options={{ title: 'Guest Information' }}
      />
      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{ title: 'Payment' }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
