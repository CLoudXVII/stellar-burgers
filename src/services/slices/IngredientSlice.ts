import { TIngredient } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getIngredientsApi } from '../../utils/burger-api';

export interface IngredientState {
  ingredients: Array<TIngredient>;
  isLoading: boolean;
  errorMessage: string | null | undefined;
}

const initialState: IngredientState = {
  ingredients: [],
  isLoading: false,
  errorMessage: null
};

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message;
      });
  },
  selectors: {
    getIngredientsSelector: (state) => state.ingredients,
    getLoadingStatus: (state) => state.isLoading
  }
});

export default ingredientSlice;
export const { getIngredientsSelector, getLoadingStatus } =
  ingredientSlice.selectors;
