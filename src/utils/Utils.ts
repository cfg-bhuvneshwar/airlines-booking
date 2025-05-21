import moment from 'moment';
import { Alert, Platform, ToastAndroid } from 'react-native';

type FareCalculationParams = {
  cabin: 'Economy' | 'Business';
  economyFare: number;
  businessFare: number;
  adults: number;
  children: number;
  infantsWithSeats: number;
};

type TripFare = {
  totalFare: number;
};

type TotalFareCalculationParams = {
  oneway: TripFare;
  roundTrip: TripFare;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = date.toLocaleString('default', {
    month: 'short',
  });
  const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let dayOfWeek = weekday[date.getDay()];
  const day = date.getDate();
  return `${day} ${month}, ${dayOfWeek}`;
};

const getDatesBetween = (sDate: string, eDate: string) => {
  const dates = [];
  let currentDate = moment(sDate);
  const stopDate = moment(eDate);

  currentDate = moment(currentDate).add(1, 'day');
  while (currentDate < stopDate) {
    dates.push(moment(currentDate).format('YYYY-MM-DD'));
    currentDate = moment(currentDate).add(1, 'day');
  }
  return dates;
};

const calculateFare = ({
  cabin,
  economyFare,
  businessFare,
  adults,
  children,
  infantsWithSeats,
}: FareCalculationParams) => {
  let totalFare = cabin === 'Economy' ? economyFare : businessFare;
  totalFare = totalFare * (adults + children + infantsWithSeats);
  return totalFare;
};

const calculateTotalFare = ({
  oneway,
  roundTrip,
}: TotalFareCalculationParams) => {
  if (Object.keys(roundTrip).length > 0) {
    return oneway.totalFare + roundTrip.totalFare;
  }
  return oneway.totalFare;
};

const formatDateDob = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Month is 0-indexed
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const generate16DigitId = () => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const showToastOrAlert = (message: string) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else if (Platform.OS === 'ios') {
    Alert.alert('Notification', message, [{ text: 'OK' }]);
  }
};

export {
  formatDate,
  getDatesBetween,
  calculateFare,
  formatDateDob,
  generate16DigitId,
  calculateTotalFare,
};
