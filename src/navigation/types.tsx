import { RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  HomeScreen: undefined;
  FlightListScreen: {
    fromCity: string;
    toCity: string;
    fromAirportCode: string;
    toAirportCode: string;
    startDate: string;
    endDate: string;
    cabin: string;
    adults: number;
    children: number;
    infants: number;
    infantsWithSeats: number;
  };
  SeatSelectionScreen: undefined;
  GuestInfoScreen: undefined;
  PaymentScreen: undefined;
  PreLoginScreen: undefined;
};

export type SplashScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SplashScreen'
>;

export type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'LoginScreen'
>;

export type RegisterScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'RegisterScreen'
>;

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'HomeScreen'
>;

export type FlightListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FlightListScreen'
>;

export type SeatSelectionScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SeatSelectionScreen'
>;

export type GuestInfoScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'GuestInfoScreen'
>;

export type PaymentScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PaymentScreen'
>;

export type PreLoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PreLoginScreen'
>;

export type RootTabParamList = {
  Home: undefined;
  Book: undefined;
  Trips: undefined;
  Profile: undefined;
};

export type HomeRouteProp = RouteProp<RootTabParamList, 'Home'>;

export type BookRouteProp = RouteProp<RootTabParamList, 'Book'>;

export type TripsRouteProp = RouteProp<RootTabParamList, 'Trips'>;

export type ProfileRouteProp = RouteProp<RootTabParamList, 'Profile'>;
