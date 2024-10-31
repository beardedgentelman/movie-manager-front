import { combineReducers, configureStore } from '@reduxjs/toolkit';

import userReducer from './reducers/userSlice';
import headerReducer from './reducers/headerSlice';
import { authAPI } from '@/api/authAPI';
import { userAPI } from '@/api/userAPI';
import { moviesAPI } from '@/api/moviesAPI';

const rootReducer = combineReducers({
  userReducer,
  headerReducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [moviesAPI.reducerPath]: moviesAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authAPI.middleware,
      userAPI.middleware,
      moviesAPI.middleware
    ),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
