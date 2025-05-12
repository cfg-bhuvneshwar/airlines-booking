import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './types';
import { UserData } from '../utils/types';

interface UserState {
  user: UserData;
}

const initialState: UserState = {
  user: {
    uid: '',
    name: '',
    email: '',
    image_url: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUserData: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
    },
  },
});

export const { saveUserData } = userSlice.actions;

export const selectUserData = (state: RootState) => state.user;

export const userSliceReducer = userSlice.reducer;
