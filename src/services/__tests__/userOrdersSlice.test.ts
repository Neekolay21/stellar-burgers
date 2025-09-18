import userOrdersReducer, { getUserOrders, initialState } from '../userOrdersSlice';
import { mockUserOrders } from '../mockData';

jest.mock('@api', () => ({
  getOrdersApi: jest.fn()
}));

describe('тесты user OrdersSlice', () => {
  test('getUserOrders.pending', () => {
    const state = userOrdersReducer(initialState, getUserOrders.pending(''));
    expect(state.userOrdersLoading).toBe(true);
    expect(state.userOrdersError).toBeNull();
  });

  test('getUserOrders.rejected', () => {
    const errorMessage = 'Ошибка загрузки заказов';
    const state = userOrdersReducer(
      initialState,
      getUserOrders.rejected(new Error(errorMessage), '')
    );
    expect(state.userOrdersLoading).toBe(false);
    expect(state.userOrdersError).toBe(errorMessage);
  });

  test('getUserOrders.fulfilled', () => {
    const state = userOrdersReducer(
      initialState,
      getUserOrders.fulfilled(mockUserOrders, '')
    );
    expect(state.userOrdersLoading).toBe(false);
    expect(state.userOrders).toEqual(mockUserOrders);
    expect(state.userOrdersError).toBeNull();
  });
});
