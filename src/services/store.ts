import { combineReducers, configureStore } from '@reduxjs/toolkit';
import burgerSliceReducer from './burgerSlice';
import userSliceReducer, { logoutUserThunk } from './userSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  burger: burgerSliceReducer,
  user: userSliceReducer
});

const authErrorMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action);

  // Если действие отклонено и связано с авторизацией
  if (action.type?.endsWith('/rejected')) {
    const errorMessage = action.error?.message || '';

    if (
      errorMessage.includes('jwt expired') ||
      errorMessage.includes('401') ||
      errorMessage.includes('Unauthorized')
    ) {
      // Очищаем данные пользователя
      store.dispatch(logoutUserThunk());
    }
  }

  return result;
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authErrorMiddleware),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
