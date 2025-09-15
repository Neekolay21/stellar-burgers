import userReducer, {
  loginUserThunk,
  registerUserThunk,
  getUserThunk,
  updateUserThunk,
  logoutUserThunk,
  clearError,
  setInit,
  initialState
} from '../userSlice';
import { mockUserData, mockLoginData, mockUserRegisterData } from '../mockData';

jest.mock('@api', () => ({
  getUserApi: jest.fn(),
  loginUserApi: jest.fn(),
  logoutApi: jest.fn(),
  registerUserApi: jest.fn(),
  updateUserApi: jest.fn()
}));

describe('тесты userSlice', () => {
  test('clearError', () => {
    const stateWithError = { ...initialState, error: 'Ошибка' };
    const state = userReducer(stateWithError, clearError());
    expect(state.error).toBeNull();
  });

  test('setInit', () => {
    const state = userReducer(initialState, setInit());
    expect(state.isInit).toBe(true);
  });

  test('loginUserThunk.fulfilled', () => {
    const action = {
      type: loginUserThunk.fulfilled.type,
      payload: { user: mockUserData }
    };
    const state = userReducer(initialState, action);
    expect(state.user).toEqual(mockUserData);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  test('registerUserThunk.fulfilled', () => {
    const action = {
      type: registerUserThunk.fulfilled.type,
      payload: { user: mockUserData }
    };
    const state = userReducer(initialState, action);
    expect(state.user).toEqual(mockUserData);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  test('getUserThunk.fulfilled', () => {
    const action = { type: getUserThunk.fulfilled.type, payload: mockUserData };
    const state = userReducer(initialState, action);
    expect(state.user).toEqual(mockUserData);
    expect(state.isLoading).toBe(false);
    expect(state.isInit).toBe(true);
    expect(state.error).toBeNull();
  });

  test('updateUserThunk.fulfilled', () => {
    const updatedUser = { ...mockUserData, name: 'updated' };
    const action = {
      type: updateUserThunk.fulfilled.type,
      payload: updatedUser
    };
    const state = userReducer(initialState, action);
    expect(state.user).toEqual(updatedUser);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  test('logoutUserThunk.fulfilled', () => {
    const stateBefore = { ...initialState, user: mockUserData };
    const action = { type: logoutUserThunk.fulfilled.type };
    const state = userReducer(stateBefore, action);
    expect(state.user).toBeNull();
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });
});
