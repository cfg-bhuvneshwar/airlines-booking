import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './types';
import { UserData } from '../utils/types';

interface UserState {
  user: UserData;
  registerData: UserData[];
}

const initialState: UserState = {
  user: {
    uid: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    title: '',
    loyaltyTier: '',
    points: 0,
    bookings: 0,
    miles: 0,
    contactNumber: '',
  },
  registerData: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUserData: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
    },
    saveRegisterData: (state, action: PayloadAction<UserData>) => {
      const arr = state.registerData;
      arr.push(action.payload);
      state.registerData = arr;
    },
    updateRegisterData: (state, action: PayloadAction<UserData>) => {
      const registerArr = state.registerData;
      let payload = action.payload;
      let userData = registerArr.find(
        ({ uid }) => uid === payload.uid,
      ) as UserData;
      const index = registerArr.findIndex(
        ({ uid }) => uid === payload.uid,
      ) as number;
      userData.loyaltyTier = payload.loyaltyTier;
      userData.points = payload.points;
      userData.bookings = payload.bookings;
      userData.miles = payload.miles;
      registerArr[index] = userData;
      state.registerData = registerArr;
    },
  },
});

export const { saveUserData, saveRegisterData, updateRegisterData } =
  userSlice.actions;

export const selectUserData = (state: RootState) => state.user.user;
export const selectRegisterData = (state: RootState) => state.user.registerData;

export const selectState = (state: RootState) => state;

export const userSliceReducer = userSlice.reducer;
