import {
  OrderHistoryState,
  ordersHistory,
  orderHistorySlice
} from '../OrderHistorySlice';

import { mockOrders } from '../__mocks__/orders';

const initialState: OrderHistoryState = {
  orders: [],
  isLoading: false,
  errorMessage: null
};

describe('[OrderHistorySlice] Поучение истории заказов ordersHistory', () => {
  it('pending: устанавливает isLoading: true и сбрасывает ошибку', () => {
    const state = orderHistorySlice.reducer(
      { ...initialState, errorMessage: 'Test err' },
      ordersHistory.pending('')
    );

    expect(state).toEqual({
      orders: [],
      isLoading: true,
      errorMessage: null
    });
  });

  it('fulfilled: обновляет заказы и завершает загрузку', () => {
    const state = orderHistorySlice.reducer(
      { ...initialState, isLoading: true },
      ordersHistory.fulfilled(mockOrders, '')
    );

    expect(state).toEqual({
      orders: mockOrders,
      isLoading: false,
      errorMessage: null
    });
  });

  it('rejected: устанавливает ошибку и завершает загрузку', () => {
    const error = new Error('Test err');

    const state = orderHistorySlice.reducer(
      { ...initialState, isLoading: true },
      ordersHistory.rejected(error, '')
    );

    expect(state).toEqual({
      orders: [],
      isLoading: false,
      errorMessage: 'Test err'
    });
  });
});
