import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './types';

interface AepInitialState {
  experienceCloudId: string;
}

const initialState: AepInitialState = {
  experienceCloudId: '',
};

const aepSlice = createSlice({
  name: 'aep',
  initialState,
  reducers: {
    saveExperienceCloudId: (state, action: PayloadAction<string>) => {
      state.experienceCloudId = action.payload;
    },
  },
});

export const { saveExperienceCloudId } = aepSlice.actions;

export const selectExperienceCloudId = (state: RootState) =>
  state.aep.experienceCloudId;

export const selectState = (state: RootState) => state;

export const aepSliceReducer = aepSlice.reducer;
