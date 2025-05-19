import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './types';
import {
  BookingData,
  CurrentBookingData,
  RecentSearchData,
} from '../utils/types';

interface FlightState {
  recentSearch: RecentSearchData[];
  currentBooking: CurrentBookingData;
}

const initialState: FlightState = {
  recentSearch: [],
  currentBooking: {},
};

const flightSlice = createSlice({
  name: 'flight',
  initialState,
  reducers: {
    saveRecentSearch: (state, action: PayloadAction<RecentSearchData>) => {
      const arr = state.recentSearch;
      const found = arr.find(
        el =>
          el.fromAirportCode === action.payload.fromAirportCode &&
          el.toAirportCode === action.payload.toAirportCode &&
          el.cabin === action.payload.cabin &&
          el.startDate === action.payload.startDate &&
          el.endDate === action.payload.endDate &&
          el.adults === action.payload.adults &&
          el.children === action.payload.children &&
          el.infants === action.payload.infants &&
          el.infantsWithSeats === action.payload.infantsWithSeats,
      );

      if (found === undefined) {
        if (arr.length === 3) {
          arr.pop();
        }
        arr.unshift(action.payload);

        state.recentSearch = arr;
      } else {
        const index = arr.indexOf(found);

        if (index > -1) {
          arr.splice(index, 1);
        }
        arr.unshift(found);
      }
    },
    saveCurrentBookingData: (
      state,
      action: PayloadAction<CurrentBookingData>,
    ) => {
      if (Object.keys(action.payload).length > 0) {
        if ('oneway' in action.payload) {
          state.currentBooking.oneway = action.payload.oneway as BookingData;
        } else if ('roundTrip' in action.payload) {
          state.currentBooking.roundTrip = action.payload
            .roundTrip as BookingData;
        } else {
          state.currentBooking.guestInformation =
            action.payload.guestInformation;
          state.currentBooking.contactNumber = action.payload.contactNumber;
          state.currentBooking.email = action.payload.email;
        }
      } else {
        state.currentBooking = action.payload;
      }
    },
  },
});

export const { saveRecentSearch, saveCurrentBookingData } = flightSlice.actions;

export const selectRecentSearchData = (state: RootState) =>
  state.flight.recentSearch;

export const selectCurrentBooking = (state: RootState) =>
  state.flight.currentBooking;

export const flightSliceReducer = flightSlice.reducer;
