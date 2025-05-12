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

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
  whitelist: ['user'],
};

const flightPersistConfig = {
  key: 'flight',
  storage: AsyncStorage,
  whitelist: ['recentSearch'],
};

const dynamicReducer = {
  user: persistReducer(userPersistConfig, userSliceReducer),
  flight: persistReducer(flightPersistConfig, flightSliceReducer),
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
