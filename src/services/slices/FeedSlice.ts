import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { TOrder } from '@utils-types';

import { getFeedsApi, getOrderByNumberApi } from '../../utils/burger-api';

interface FeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  errorMessage: null | string;
  isLoading: boolean;
  chosenOrder: TOrder | null;
}

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  errorMessage: null,
  isLoading: false,
  chosenOrder: null
};

export const getFeed = createAsyncThunk('feed/data', getFeedsApi);

export const getOrderByNumber = createAsyncThunk(
  'feed/getOrder',
  async (number: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(number);
      return response;
    } catch (error) {
      return rejectWithValue('Failed to fetch feed');
    }
  }
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    clearChosenOrder(state) {
      state.chosenOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message || 'Failed to fetch feed';
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chosenOrder = action.payload.orders[0];
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message || 'Failed to fetch order';
      });
  },
  selectors: {
    getFeedOrders: (state) => state.orders,
    getOrdersAmountTotal: (state) => state.total,
    getOrdersAmountToday: (state) => state.totalToday,
    getLoadingStatus: (state) => state.isLoading,
    getErrorMessage: (state) => state.errorMessage,
    getChosenOrder: (state) => state.chosenOrder
  }
});

export default feedSlice;
export const {
  getFeedOrders,
  getOrdersAmountTotal,
  getOrdersAmountToday,
  getLoadingStatus,
  getErrorMessage,
  getChosenOrder
} = feedSlice.selectors;

export const { clearChosenOrder } = feedSlice.actions;
