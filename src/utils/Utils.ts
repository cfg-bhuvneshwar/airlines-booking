import moment from 'moment';
import { Alert, Platform, ToastAndroid } from 'react-native';

import { CurrentBookingData } from './types';

type FareCalculationParams = {
  cabin: 'Economy' | 'Business';
  economyFare: number;
  businessFare: number;
  adults: number;
  children: number;
  infantsWithSeats: number;
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

const calculateTotalFare = (currentBooking: CurrentBookingData) => {
  if (
    'roundTrip' in currentBooking &&
    currentBooking.roundTrip !== undefined &&
    currentBooking.oneway !== undefined
  ) {
    return (currentBooking.oneway?.totalFare +
      currentBooking.roundTrip?.totalFare) as number;
  }
  return (currentBooking.oneway?.totalFare as number) || 0;
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

const showToastOrAlert = (message: string) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else if (Platform.OS === 'ios') {
    Alert.alert('Notification', message, [{ text: 'OK' }]);
  }
};

const convertSeatNumberToAsPerRow = (seatsArray: number[]) => {
  const newArr: string[] = [];
  seatsArray.forEach(element => {
    const rowNumber = Math.ceil(element / 6);
    const seatLetter = (() => {
      switch (element % 6) {
        case 1:
          return 'A';
        case 2:
          return 'B';
        case 3:
          return 'C';
        case 4:
          return 'D';
        case 5:
          return 'E';
        case 0:
          return 'F';
        default:
          return '';
      }
    })();
    newArr.push(`${rowNumber}${seatLetter}`);
  });
  return [...newArr];
};

export {
  formatDate,
  getDatesBetween,
  calculateFare,
  formatDateDob,
  generate16DigitId,
  calculateTotalFare,
  showToastOrAlert,
  convertSeatNumberToAsPerRow,
};
