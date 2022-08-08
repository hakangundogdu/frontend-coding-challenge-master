import { configureStore } from '@reduxjs/toolkit';
import tournamentsReducer from '../features/tournaments-slice';

export const store = configureStore({
  reducer: {
    tournaments: tournamentsReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
