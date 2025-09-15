import constructorReducer, {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  initialState
} from '../constructorSlice';
import {
  mockBun,
  mockIngredient,
  mockSauce,
  mockCreateOrderResponse
} from '../mockData';

describe('тесты constructorSlice', () => {
  test('add bun', () => {
    const state = constructorReducer(initialState, addBun(mockBun));
    expect(state.bun).not.toBeNull();
    expect(state.bun).toMatchObject({
      ...mockBun,
      id: expect.any(String)
    });
  });

  test('add ingredient', () => {
    const state = constructorReducer(
      initialState,
      addIngredient(mockIngredient)
    );
    expect(state.ingredients[0]).toMatchObject({
      ...mockIngredient,
      id: expect.any(String)
    });
  });

  test('remove ingredient', () => {
    const stateWithIngredient = {
      ...initialState,
      ingredients: [{ ...mockIngredient, id: 'unique-id-1' }]
    };
    const state = constructorReducer(
      stateWithIngredient,
      removeIngredient('unique-id-1')
    );
    expect(state.ingredients).toEqual([]);
  });

  test('move ingredient', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [
        { ...mockIngredient, id: 'id1' },
        { ...mockSauce, id: 'id2' }
      ]
    };
    const state = constructorReducer(
      stateWithIngredients,
      moveIngredient({ dragIndex: 0, hoverIndex: 1 })
    );
    expect(state.ingredients[0]).toMatchObject({ ...mockSauce, id: 'id2' });
    expect(state.ingredients[1]).toMatchObject({
      ...mockIngredient,
      id: 'id1'
    });
  });

  test('clear constructor', () => {
    const filledState = {
      bun: { ...mockBun, id: 'bun1' },
      ingredients: [
        { ...mockIngredient, id: 'id1' },
        { ...mockSauce, id: 'id2' }
      ],
      orderModalData: {
        order: mockCreateOrderResponse.order,
        name: 'test'
      }
    };
    const state = constructorReducer(filledState, clearConstructor());
    expect(state.bun).toBeNull();
    expect(state.ingredients).toEqual([]);
    expect(state.orderModalData).toBeNull();
  });
});
