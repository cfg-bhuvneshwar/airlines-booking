import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './types';
import { FinalBookingData } from '../utils/types';

interface BookingState {
  bookings: FinalBookingData[];
}

const initialState: BookingState = {
  bookings: [], // Initial state as an empty array
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    saveBookingData: (state, action: PayloadAction<FinalBookingData>) => {
      state.bookings.push(action.payload); // Append booking data to the array
    },
  },
});

export const { saveBookingData } = bookingSlice.actions;

export const selectBookingData = (state: RootState) => {
  const uid = state.user.user.uid;
  let bookings = [];
  if (uid !== '') {
    bookings = state.booking.bookings.filter(booking => booking.userId === uid);
    return bookings;
  }

  return state.booking.bookings.filter(booking => booking.userId === '');
};

export const bookingSliceReducer = bookingSlice.reducer;
