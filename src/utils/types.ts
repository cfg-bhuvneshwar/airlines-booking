export interface UserData {
  uid: string;
  title: string;
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  contactNumber: string;
  password?: string;
  loyaltyTier: 'Silver' | 'Gold' | 'Platinum' | '';
  points: number;
  bookings: number;
  miles: number;
}

export interface RecentSearchData {
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
}

export interface BookingData {
  flightId: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  numberOfStops: number;
  timeDuration: string;
  fromAirportCode: string;
  toAirportCode: string;
  economyFare: number;
  businessFare: number;
  cabin: string;
  adults: number;
  children: number;
  infantsWithSeats: number;
  infants: number;
  totalFare: number;
  date: string;
  seats?: string[];
  miles: number;
}

export interface CurrentBookingData {
  oneway?: BookingData;
  roundTrip?: BookingData;
  guestInformation?: {
    id: string;
    firstName: string;
    lastName: string;
    title: string;
  }[];
  contactNumber?: string;
  email?: string;
}

export interface FinalBookingData {
  userId: string;
  bookingId: string;
  bookingDate: string;
  oneway?: BookingData;
  roundTrip?: BookingData;
  totalFare: number;
  paymentMethod: string;
  cardDetails: {};
  guestsInformation: [];
  contactNumber: string;
  email: string;
}

export type MyCallback = () => void;

export type MyCallbackGetUsers = (users: UserData[]) => void;
