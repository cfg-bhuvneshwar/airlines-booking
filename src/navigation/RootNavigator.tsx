import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/authentication/LoginScreen';
import RegisterScreen from '../screens/authentication/RegisterScreen';
import HomeScreen from '../screens/booking/HomeScreen';
import FlightListScreen from '../screens/booking/FlightListScreen';
import SeatSelectionScreen from '../screens/booking/SeatSelectionScreen';
import GuestInfoScreen from '../screens/booking/GuestInfoScreen';
import PaymentScreen from '../screens/booking/PaymentScreen';
import PreLoginScreen from '../screens/authentication/PreLoginScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PreLoginScreen"
        component={PreLoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FlightListScreen"
        component={FlightListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SeatSelectionScreen"
        component={SeatSelectionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GuestInfoScreen"
        component={GuestInfoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
