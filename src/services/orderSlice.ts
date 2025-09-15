import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
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
  userOrdersError: string | null | undefined;
};

export const initialState: TOrderState = {
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

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0];
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    closeOrderModal: (state) => {
      state.orderModalData = null;
      state.orderRequest = false;
      state.orderError = null;
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
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.userOrdersLoading = true;
        state.userOrdersError = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.userOrdersLoading = false;
        if (state.orderModalData) {
          state.orderModalData.order = action.payload;
        } else {
          state.orderModalData = { order: action.payload, name: '' };
        }
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.userOrdersLoading = false;
        state.userOrdersError = action.error.message;
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
