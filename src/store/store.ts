import { configureStore } from '@reduxjs/toolkit';
import { youtubeApi } from '../services/youtubeApi';
import searchReducer from '../features/search/searchSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    auth: authReducer,
    [youtubeApi.reducerPath]: youtubeApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(youtubeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
