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
    date: string;
    cabin: string;
    adults: number;
    children: number;
    infants: number;
    infantsWithSeats: number;
  };
  SeatSelectionScreen: undefined;
  GuestInfoScreen: undefined;
  PaymentScreen: undefined;
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