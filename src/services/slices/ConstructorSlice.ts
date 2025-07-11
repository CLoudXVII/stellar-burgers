import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  nanoid
} from '@reduxjs/toolkit';

import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

import { orderBurgerApi } from '../../utils/burger-api';

interface ConstructorState {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: Array<TConstructorIngredient>;
  };
  orderRequestStatus: boolean;
  orderModalData: TOrder | null;
  isLoading: boolean;
  errorMessage: string | null | undefined;
}

const initialState: ConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequestStatus: false,
  orderModalData: null,
  isLoading: false,
  errorMessage: null
};

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (data: string[]) => {
    const response = await orderBurgerApi(data);
    return response;
  }
);

export const constructorSlice = createSlice({
  name: 'burgerconstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const key = nanoid();
        return { payload: { ...ingredient, id: key } };
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload.id
        );
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0) {
        const ingredients = state.constructorItems.ingredients;
        [ingredients[index - 1], ingredients[index]] = [
          ingredients[index],
          ingredients[index - 1]
        ];
      }
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < state.constructorItems.ingredients.length - 1) {
        const ingredients = state.constructorItems.ingredients;
        [ingredients[index + 1], ingredients[index]] = [
          ingredients[index],
          ingredients[index + 1]
        ];
      }
    },
    resetOrder: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequestStatus = true;
        state.errorMessage = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequestStatus = false;
        state.orderModalData = action.payload.order;
        state.constructorItems.bun = null;
        state.constructorItems.ingredients = [];
        state.errorMessage = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequestStatus = false;
        state.errorMessage = action.error.message;
      });
  },
  selectors: {
    getConstructorItems: (state) => state.constructorItems,
    getOrderRequestStatus: (state) => state.orderRequestStatus,
    getOrderModalData: (state) => state.orderModalData,
    getLoadingStatus: (state) => state.isLoading,
    getErrorMessage: (state) => state.errorMessage
  }
});

export default constructorSlice;
export const {
  getConstructorItems,
  getOrderRequestStatus,
  getOrderModalData,
  getLoadingStatus,
  getErrorMessage
} = constructorSlice.selectors;

export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  resetOrder
} = constructorSlice.actions;
