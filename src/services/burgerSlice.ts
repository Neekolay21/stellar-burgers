import {
  getFeedsApi,
  getIngredientsApi,
  getOrdersApi,
  orderBurgerApi
} from '@api';
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  createSelector
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { error } from 'console';

type TBurgerState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: {
    order: TOrder;
    name: string;
  } | null;
  feeds: {
    orders: TOrder[];
    total: number;
    totalToday: number;
  } | null;
  feedsLoading: boolean;
  feedsError: string | null;
  userOrders: TOrder[];
  userOrdersLoading: boolean;
  userOrdersError: string | null;
};

const initialState: TBurgerState = {
  ingredients: [],
  loading: false,
  error: null,
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  feeds: null,
  feedsLoading: false,
  feedsError: null,
  userOrders: [],
  userOrdersLoading: false,
  userOrdersError: null
};

export const getBurgers = createAsyncThunk<TIngredient[], void>(
  'burgers/getAll',
  async () => getIngredientsApi()
);

export const createOrder = createAsyncThunk<
  { order: TOrder; name: string },
  string[]
>('burger/createOrder', async (ingredients) => orderBurgerApi(ingredients));

export const getOrders = createAsyncThunk<
  { orders: TOrder[]; total: number; totalToday: number },
  void
>('burger/getOrders', async () => getFeedsApi());

export const getUserOrders = createAsyncThunk<TOrder[], void>(
  'burger/getUserOrders',
  async () => {
    const orders = await getOrdersApi();
    return orders;
  }
);

export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    // Добавить булочку в конструктор
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.constructorItems.bun = {
        ...action.payload,
        id: `${action.payload._id}-${Date.now()}`
      };
    },
    // Добавить ингредиент в конструктор
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      const newIngredient: TConstructorIngredient = {
        ...action.payload,
        id: `${action.payload._id}-${Date.now()}`
      };
      state.constructorItems.ingredients.push(newIngredient);
    },
    // Удалить ингредиент из конструктора
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload
        );
    },
    // Переместить ингредиент в конструкторе
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
    // Очистить конструктор
    clearConstructor: (state) => {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
      state.orderModalData = null;
    },
    // Закрыть модальное окно заказа
    closeOrderModal: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBurgers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getBurgers.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.loading = false;
          state.ingredients = action.payload;
        }
      )
      .addCase(getBurgers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка запроса';
      })
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;

        state.constructorItems.bun = null;
        state.constructorItems.ingredients = [];

        if (state.userOrders) {
          state.userOrders.unshift(action.payload.order);
        }
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Ошибка создания заказа';
      })
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
      })
      .addCase(getUserOrders.pending, (state) => {
        state.userOrdersLoading = true;
        state.userOrdersError = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.userOrdersLoading = false;
        state.userOrders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.userOrdersLoading = false;
        state.userOrdersError =
          action.error.message || 'Ошибка загрузки заказов';
      });
  }
});

export const {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  closeOrderModal
} = burgerSlice.actions;

export default burgerSlice.reducer;

export const selectIngredients = (state: { burger: TBurgerState }) =>
  state.burger.ingredients;
export const selectIngredientsLoading = (state: { burger: TBurgerState }) =>
  state.burger.loading;
export const selectIngredientsError = (state: { burger: TBurgerState }) =>
  state.burger.error;

export const selectConstructorItems = (state: { burger: TBurgerState }) =>
  state.burger.constructorItems;
export const selectOrderRequest = (state: { burger: TBurgerState }) =>
  state.burger.orderRequest;
export const selectOrderModalData = (state: { burger: TBurgerState }) =>
  state.burger.orderModalData;
export const selectIngredientsCounters = createSelector(
  [selectConstructorItems],
  (constructorItems) => {
    const counters: { [key: string]: number } = {};
    constructorItems.ingredients.forEach((ingredient) => {
      counters[ingredient._id] = (counters[ingredient._id] || 0) + 1;
    });
    return counters;
  }
);
export const selectIngredientById = (
  state: { burger: TBurgerState },
  id: string
) =>
  state.burger.ingredients.find((ingredient) => ingredient._id === id) || null;

export const selectFeeds = (state: { burger: TBurgerState }) =>
  state.burger.feeds;
export const selectFeedsLoading = (state: { burger: TBurgerState }) =>
  state.burger.feedsLoading;
export const selectFeedsError = (state: { burger: TBurgerState }) =>
  state.burger.feedsError;

export const selectUserOrders = (state: { burger: TBurgerState }) =>
  state.burger.userOrders;
export const selectUserOrdersLoading = (state: { burger: TBurgerState }) =>
  state.burger.userOrdersLoading;
export const selectUserOrdersError = (state: { burger: TBurgerState }) =>
  state.burger.userOrdersError;
