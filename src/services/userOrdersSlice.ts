import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';
import { TOrdersData, TOrder } from '@utils-types';

export type TUserOrdersState = {
  userOrders: TOrder[];
  userOrdersLoading: boolean;
  userOrdersError: string | null;
};

const initialState: TUserOrdersState = {
  userOrders: [],
  userOrdersLoading: false,
  userOrdersError: null
};

export const getUserOrders = createAsyncThunk<TOrder[], void>(
  'userOrders/getUserOrders',
  async () => {
    const orders = await getOrdersApi();
    return orders;
  }
);

export const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.userOrdersLoading = true;
        state.userOrdersError = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.userOrdersLoading = false;
        state.userOrders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.userOrdersLoading = false;
        state.userOrdersError =
          action.error.message || 'Ошибка загрузки заказов';
      });
  }
});

export default userOrdersSlice.reducer;

export const selectUserOrders = (state: { userOrder: TUserOrdersState }) =>
  state.userOrder.userOrders;
export const selectUserOrdersLoading = (state: {
  userOrder: TUserOrdersState;
}) => state.userOrder.userOrdersLoading;
export const selectUserOrdersError = (state: { userOrder: TUserOrdersState }) =>
  state.userOrder.userOrdersError;
