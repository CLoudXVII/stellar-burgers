import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { TOrder } from '../../utils/types';
import { getOrdersApi } from '../../utils/burger-api';

interface OrderHistoryState {
  orders: TOrder[];
  isLoading: boolean;
  errorMessage: null | string | undefined;
}

const initialState: OrderHistoryState = {
  orders: [],
  isLoading: false,
  errorMessage: null
};

export const ordersHistory = createAsyncThunk(
  'user/orderHistory',
  getOrdersApi
);

export const orderHistorySlice = createSlice({
  name: 'ordershistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ordersHistory.pending, (state) => {
        (state.isLoading = true), (state.errorMessage = null);
      })
      .addCase(ordersHistory.fulfilled, (state, action) => {
        (state.orders = action.payload),
          (state.isLoading = false),
          (state.errorMessage = null);
      })
      .addCase(ordersHistory.rejected, (state, action) => {
        (state.errorMessage = action.error.message || 'Error orders history'),
          (state.isLoading = false);
      });
  },
  selectors: {
    getOrderHistory: (state) => state.orders,
    getErrorMessage: (state) => state.errorMessage,
    getOrderLoadingStatus: (state) => state.isLoading
  }
});

export default orderHistorySlice;

export const { getOrderHistory, getErrorMessage, getOrderLoadingStatus } =
  orderHistorySlice.selectors;
