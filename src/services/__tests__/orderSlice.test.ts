import orderReducer, {
  createOrder,
  getOrderByNumber,
  closeOrderModal
} from '../orderSlice';
import {
  mockOrderIds,
  mockOrderNumber,
  mockCreateOrderResponse,
  mockOrderResponse
} from '../mockData';

jest.mock('@api', () => ({
  orderBurgerApi: jest.fn(),
  getOrderByNumberApi: jest.fn(),
  getOrdersApi: jest.fn()
}));

const initialState = {
  orderModalData: null,
  orderRequest: false,
  orderError: null,
  userOrders: [],
  userOrdersLoading: false,
  userOrdersError: null
};

describe('тесты orderSlice', () => {
  test('createOrder.pending', () => {
    const state = orderReducer(
      initialState,
      createOrder.pending('', mockOrderIds)
    );
    expect(state.orderRequest).toBe(true);
    expect(state.orderError).toBeNull();
  });

  test('createOrder.rejected', () => {
    const errorMessage = 'Ошибка создания заказа';
    const state = orderReducer(
      initialState,
      createOrder.rejected(new Error(errorMessage), '', mockOrderIds)
    );
    expect(state.orderRequest).toBe(false);
    expect(state.orderError).toBe(errorMessage);
  });

  test('createOrder.fulfilled', () => {
    const state = orderReducer(
      initialState,
      createOrder.fulfilled(mockCreateOrderResponse, '', mockOrderIds)
    );
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(mockCreateOrderResponse);
    expect(state.orderError).toBeNull();
  });

  test('getOrderByNumber.pending', () => {
    const state = orderReducer(
      initialState,
      getOrderByNumber.pending('', mockOrderNumber)
    );
    expect(state.userOrdersLoading).toBe(true);
    expect(state.userOrdersError).toBeNull();
  });

  test('getOrderByNumber.rejected', () => {
    const errorMessage = 'Ошибка';
    const state = orderReducer(
      initialState,
      getOrderByNumber.rejected(new Error(errorMessage), '', mockOrderNumber)
    );
    expect(state.userOrdersLoading).toBe(false);
    expect(state.userOrdersError).toBe(errorMessage);
  });

  test('getOrderByNumber.fulfilled', () => {
    const state = orderReducer(
      initialState,
      getOrderByNumber.fulfilled(
        mockOrderResponse.orders[0],
        '',
        mockOrderNumber
      )
    );
    expect(state.userOrdersLoading).toBe(false);
    expect(state.orderModalData).toEqual({
      order: mockOrderResponse.orders[0],
      name: ''
    });
  });

  test('closeOrderModal', () => {
    const filledState = {
      ...initialState,
      orderModalData: mockCreateOrderResponse,
      orderRequest: true,
      orderError: 'error'
    };
    const state = orderReducer(filledState, closeOrderModal());
    expect(state.orderModalData).toBeNull();
    expect(state.orderRequest).toBe(false);
    expect(state.orderError).toBeNull();
  });
});
