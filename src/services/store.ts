import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSliceReducer, { logoutUserThunk } from './userSlice';
import ingredientsSliceReducer from './ingredientsSlice';
import constructorSliceReducer from './constructorSlice';
import orderSliceReducer from './orderSlice';
import feedSliceReducer from './feedSlice';
import userOrderSliceReducer from './userOrdersSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  user: userSliceReducer,
  ingredients: ingredientsSliceReducer,
  constructor: constructorSliceReducer,
  order: orderSliceReducer,
  feed: feedSliceReducer,
  userOrder: userOrderSliceReducer
});

const authErrorMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action);

  
  if (action.type?.endsWith('/rejected')) {
    const errorMessage = action.error?.message || '';

    if (
      errorMessage.includes('jwt expired') ||
      errorMessage.includes('401') ||
      errorMessage.includes('Unauthorized')
    ) {
    
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
