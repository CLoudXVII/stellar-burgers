import { mockFeedResponse, mockOrders } from '../__mocks__/orders';

import { getFeed, getOrderByNumber, FeedState, feedSlice } from '../FeedSlice';

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  errorMessage: null,
  isLoading: false,
  chosenOrder: null
};

describe('[FeedSlice] Получение ленты заказов getFeed', () => {
  it('pending: устанавливает isLoading в true и сбрасывает ошибку', () => {
    const state = feedSlice.reducer(
      { ...initialState, errorMessage: 'Test err' },
      getFeed.pending('')
    );

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      errorMessage: null
    });
  });

  it('fulfilled: сохраняет данные заказов и сбрасывает isLoading', () => {
    const state = feedSlice.reducer(
      { ...initialState, isLoading: true },
      getFeed.fulfilled(mockFeedResponse, '')
    );

    expect(state).toEqual({
      ...initialState,
      orders: mockFeedResponse.orders,
      total: mockFeedResponse.total,
      totalToday: mockFeedResponse.totalToday,
      isLoading: false
    });
  });

  it('rejected: сохраняет сообщение об ошибке и сбрасывает isLoading', () => {
    const error = new Error('Test err');

    const state = feedSlice.reducer(
      { ...initialState, isLoading: true },
      getFeed.rejected(error, '')
    );

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      errorMessage: 'Test err'
    });
  });
});

describe('[FeedSlice] Получение заказа по номеру getOrderByNumber', () => {
  it('pending: устанавливает isLoading в true и сбрасывает ошибку', () => {
    const state = feedSlice.reducer(
      { ...initialState, errorMessage: 'Test err' },
      getOrderByNumber.pending('1', 1)
    );

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      errorMessage: null
    });
  });

  it('fulfilled: сохраняет выбранный заказ и сбрасывает isLoading', () => {
    const state = feedSlice.reducer(
      { ...initialState, isLoading: true },
      getOrderByNumber.fulfilled(mockFeedResponse, '1', 1)
    );

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      chosenOrder: mockOrders[0]
    });
  });

  it('rejected: сохраняет сообщение об ошибке и сбрасывает isLoading', () => {
    const error = new Error('Test err');

    const state = feedSlice.reducer(
      { ...initialState, isLoading: true },
      getOrderByNumber.rejected(error, '1', 1)
    );

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      errorMessage: 'Test err'
    });
  });
})
