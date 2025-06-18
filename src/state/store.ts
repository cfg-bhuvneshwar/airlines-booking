import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { userSliceReducer } from './userSlice';
import { flightSliceReducer } from './flightSlice';
import { bookingSliceReducer } from './bookingSlice';
import { preLoginSliceReducer } from './preLoginSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['flight'],
};

const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
  whitelist: ['user', 'registerData'],
};

const flightPersistConfig = {
  key: 'flight',
  storage: AsyncStorage,
  whitelist: ['recentSearch'],
  blacklist: ['currentBooking'],
};

const bookingPersistConfig = {
  key: 'booking',
  storage: AsyncStorage,
  whitelist: ['bookings'],
};

const preLoginPersistConfig = {
  key: 'preLogin',
  storage: AsyncStorage,
  whitelist: ['preLoginVisited'],
};

const dynamicReducer = {
  user: persistReducer(userPersistConfig, userSliceReducer),
  flight: persistReducer(flightPersistConfig, flightSliceReducer),
  booking: persistReducer(bookingPersistConfig, bookingSliceReducer),
  preLogin: persistReducer(preLoginPersistConfig, preLoginSliceReducer),
};
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(dynamicReducer),
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
