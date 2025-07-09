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

describe('[FeedSlice] Работа с лентой заказов', () => {
  it('устанавливает isLoading в true и сбрасывает ошибку при загрузке ленты', () => {
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

  it('сохраняет данные заказов и сбрасывает isLoading при успешной загрузке ленты', () => {
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

  it('сохраняет сообщение об ошибке и сбрасывает isLoading при неудачной загрузке ленты', () => {
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

  it('устанавливает isLoading в true и сбрасывает ошибку при загрузке заказа по номеру', () => {
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

  it('сохраняет выбранный заказ и сбрасывает isLoading при успешной загрузке заказа по номеру', () => {
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

  it('сохраняет сообщение об ошибке и сбрасывает isLoading при неудачной загрузке заказа по номеру', () => {
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
});
