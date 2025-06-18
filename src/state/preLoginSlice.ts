import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './types';

interface PreLoginState {
  preLoginVisited: boolean;
}

const initialState: PreLoginState = {
  preLoginVisited: false,
};

const preLoginSlice = createSlice({
  name: 'preLogin',
  initialState,
  reducers: {
    savePreLogin: (state, action: PayloadAction<boolean>) => {
      state.preLoginVisited = action.payload;
    },
  },
});

export const { savePreLogin } = preLoginSlice.actions;

export const selectPreLoginData = (state: RootState) => state.preLogin.preLoginVisited;

export const preLoginSliceReducer = preLoginSlice.reducer;
