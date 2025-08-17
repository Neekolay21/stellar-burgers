import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient, TOrder } from '@utils-types';

export type TConstructorState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderModalData: {
    order: TOrder;
    name: string;
  } | null;
};

const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderModalData: null
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.constructorItems.bun = {
        ...action.payload,
        id: `${action.payload._id}-${Date.now()}`
      };
    },
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      const newIngredient: TConstructorIngredient = {
        ...action.payload,
        id: `${action.payload._id}-${Date.now()}`
      };
      state.constructorItems.ingredients.push(newIngredient);
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload
        );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) => {
      const { dragIndex, hoverIndex } = action.payload;
      const ingredients = [...state.constructorItems.ingredients];
      const draggedItem = ingredients[dragIndex];
      ingredients.splice(dragIndex, 1);
      ingredients.splice(hoverIndex, 0, draggedItem);
      state.constructorItems.ingredients = ingredients;
    },
    clearConstructor: (state) => {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
      state.orderModalData = null;
    }
  }
});

export const {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = constructorSlice.actions;

export default constructorSlice.reducer;

export const selectConstructorItems = (state: {
  constructor: TConstructorState;
}) => state.constructor?.constructorItems ?? initialState.constructorItems;

export const selectIngredientsCounters = createSelector(
  [selectConstructorItems],
  (constructorItems) => {
    const counters: { [key: string]: number } = {};
    constructorItems.ingredients.forEach((ingredient) => {
      counters[ingredient._id] = (counters[ingredient._id] || 0) + 1;
    });
    if (constructorItems.bun) {
      counters[constructorItems.bun._id] = 1;
    }
    return counters;
  }
);
