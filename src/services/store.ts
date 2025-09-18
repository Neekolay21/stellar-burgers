import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import userSliceReducer from './userSlice';
import ingredientsSliceReducer from './ingredientsSlice';
import constructorSliceReducer from './constructorSlice';
import orderSliceReducer from './orderSlice';
import feedSliceReducer from './feedSlice';
import userOrderSliceReducer from './userOrdersSlice';

export const rootReducer = combineReducers({
  user: userSliceReducer,
  ingredients: ingredientsSliceReducer,
  burgerConstructor: constructorSliceReducer,
  order: orderSliceReducer,
  feed: feedSliceReducer,
  userOrder: userOrderSliceReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
