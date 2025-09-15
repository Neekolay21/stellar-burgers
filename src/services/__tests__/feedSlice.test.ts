import feedReducer, { getOrders, initialState } from '../feedSlice';
import { mockFeedsData } from '../mockData';

jest.mock('@api', () => ({
  getFeedsApi: jest.fn()
}));

describe('тесты feedSlice', () => {
  test('getOrders.pending', () => {
    const state = feedReducer(initialState, getOrders.pending(''));
    expect(state.feedsLoading).toBe(true);
    expect(state.feedsError).toBeNull();
  });

  test('getOrders.rejected', () => {
    const errorMessage = 'Ошибка создания заказа';
    const state = feedReducer(
      initialState,
      getOrders.rejected(new Error(errorMessage), '')
    );
    expect(state.feedsLoading).toBe(false);
    expect(state.feedsError).toBe(errorMessage);
  });

  test('getOrders.fulfilled', () => {
    const state = feedReducer(
      initialState,
      getOrders.fulfilled(mockFeedsData, '')
    );
    expect(state.feedsLoading).toBe(false);
    expect(state.feeds).toEqual(mockFeedsData);
    expect(state.feedsError).toBeNull();
  });
});
