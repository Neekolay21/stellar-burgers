import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

export type TIngredientsState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
};

export const initialState: TIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

export const getIngredients = createAsyncThunk<TIngredient[], void>(
  'ingredients/getAll',
  async () => getIngredientsApi()
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.loading = false;
          state.ingredients = action.payload;
        }
      )
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки ингредиентов';
      });
  }
});

export default ingredientsSlice.reducer;

export const selectIngredients = (state: { ingredients: TIngredientsState }) =>
  state.ingredients.ingredients;
export const selectIngredientsLoading = (state: {
  ingredients: TIngredientsState;
}) => state.ingredients.loading;
export const selectIngredientsError = (state: {
  ingredients: TIngredientsState;
}) => state.ingredients.error;
export const selectIngredientById = (
  state: { ingredients: TIngredientsState },
  id: string
) =>
  state.ingredients.ingredients.find((ingredient) => ingredient._id === id) ||
  null;
