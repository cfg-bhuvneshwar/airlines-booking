import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './types';
import { RecentSearchData } from '../utils/types';

const initialState = {
  recentSearch: [] as RecentSearchData[],
};

const flightSlice = createSlice({
  name: 'flight',
  initialState,
  reducers: {
    saveRecentSearch: (state, action: PayloadAction<RecentSearchData>) => {
      const arr = state.recentSearch;
      if (arr.length === 3) {
        arr.pop();
      }
      arr.unshift(action.payload);
      state.recentSearch = arr;
    },
  },
});

export const { saveRecentSearch } = flightSlice.actions;

export const selectRecentSearchData = (state: RootState) =>
  state.flight.recentSearch;

export const flightSliceReducer = flightSlice.reducer;
