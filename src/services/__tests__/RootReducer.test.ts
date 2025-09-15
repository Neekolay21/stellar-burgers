import { rootReducer } from '../store';

jest.mock('@api', () => ({
  getUserApi: jest.fn(),
  loginUserApi: jest.fn(),
  logoutApi: jest.fn(),
  registerUserApi: jest.fn(),
  updateUserApi: jest.fn(),
  getFeedsApi: jest.fn(),
  getIngredientsApi: jest.fn(),
  getOrdersApi: jest.fn(),
  orderBurgerApi: jest.fn(),
  getOrderByNumberApi: jest.fn()
}));

describe('тест rootReducer', () => {
  test('должен вернуть initial state', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toHaveProperty('user');
    expect(initialState).toHaveProperty('ingredients');
    expect(initialState).toHaveProperty('burgerConstructor');
    expect(initialState).toHaveProperty('order');
    expect(initialState).toHaveProperty('feed');
    expect(initialState).toHaveProperty('userOrder');

    expect(typeof initialState.user).toBe('object');
    expect(typeof initialState.ingredients).toBe('object');
    expect(typeof initialState.burgerConstructor).toBe('object');
    expect(typeof initialState.order).toBe('object');
    expect(typeof initialState.feed).toBe('object');
    expect(typeof initialState.userOrder).toBe('object');
  });
});
