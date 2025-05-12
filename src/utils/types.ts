export interface UserData {
  uid: string;
  name: string;
  image_url: string;
  email?: string;
}

export interface RecentSearchData {
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
}

export type MyCallback = () => void;

export type MyCallbackGetUsers = (users: UserData[]) => void;
