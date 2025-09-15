import ingredientsReducer, { getIngredients, initialState } from '../ingredientsSlice';
import { mockIngredientsData } from '../mockData';

jest.mock('@api', () => ({
  getIngredientsApi: jest.fn()
}));

describe('тесты ingredientsSlice', () => {
  test('getIngredients.pending', () => {
    const state = ingredientsReducer(initialState, getIngredients.pending(''));
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('getIngredients.rejected', () => {
    const errorMessage = 'Ошибка загрузки ингредиентов';
    const state = ingredientsReducer(
      initialState,
      getIngredients.rejected(new Error(errorMessage), '')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  test('getIngredients.fulfilled', () => {
    const state = ingredientsReducer(
      initialState,
      getIngredients.fulfilled(mockIngredientsData, '')
    );
    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredientsData);
    expect(state.error).toBeNull();
  });
});
