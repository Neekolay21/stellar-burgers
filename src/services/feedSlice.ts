import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrdersData, TOrder } from '@utils-types';

export type TFeedState = {
  feeds: {
    orders: TOrder[];
    total: number;
    totalToday: number;
  } | null;
  feedsLoading: boolean;
  feedsError: string | null;
};

const initialState: TFeedState = {
  feeds: null,
  feedsLoading: false,
  feedsError: null
};

export const getOrders = createAsyncThunk<
  { orders: TOrder[]; total: number; totalToday: number },
  void
>('feed/getOrders', async () => getFeedsApi());

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.feedsLoading = true;
        state.feedsError = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.feedsLoading = false;
        state.feeds = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.feedsLoading = false;
        state.feedsError = action.error.message || 'Ошибка создания заказа';
      });
  }
});

export default feedSlice.reducer;

export const selectFeeds = (state: { feed: TFeedState }) => state.feed.feeds;
export const selectFeedsLoading = (state: { feed: TFeedState }) =>
  state.feed.feedsLoading;
export const selectFeedsError = (state: { feed: TFeedState }) =>
  state.feed.feedsError;
