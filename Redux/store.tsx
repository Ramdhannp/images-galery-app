import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/authApi';
import bookmarkSlice from './slices/bookmarkSlice';
import authSlice from './slices/authSlice';

export const store = configureStore({
  reducer: {
    authApi: authSlice,
    bookmark: bookmarkSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
