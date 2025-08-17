import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrdersApi, orderBurgerApi } from '@api';
import { TConstructorIngredient, TOrder } from '@utils-types';

export type TOrderState = {
  orderRequest: boolean;
  orderModalData: {
    order: TOrder;
    name: string;
  } | null;
  orderError: string | null;
  userOrders: TOrder[];
  userOrdersLoading: boolean;
  userOrdersError: string | null;
};

const initialState: TOrderState = {
  orderModalData: null,
  orderRequest: false,
  orderError: null,
  userOrders: [],
  userOrdersLoading: false,
  userOrdersError: null
};

export const createOrder = createAsyncThunk<
  { order: TOrder; name: string },
  string[]
>('order/createOrder', async (ingredients) => orderBurgerApi(ingredients));

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    closeOrderModal: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.orderError = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
        if (state.userOrders) {
          state.userOrders.unshift(action.payload.order);
        }
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderError = action.error.message || 'Ошибка создания заказа';
      });
  }
});

export const { closeOrderModal } = orderSlice.actions;

export default orderSlice.reducer;

export const selectOrderModalData = (state: { order: TOrderState }) =>
  state.order.orderModalData;
export const selectOrderRequest = (state: { order: TOrderState }) =>
  state.order.orderRequest;
export const selectOrderError = (state: { order: TOrderState }) =>
  state.order.orderError;
