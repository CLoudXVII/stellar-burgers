import { TConstructorIngredient } from '@utils-types';

import { mockError, mockOrderResponse } from '../__mocks__/order';
import burgerConstructorSlice, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  resetOrder,
  createOrder
} from '../ConstructorSlice';

import {
  mockBunIngredient,
  mockMainIngredient,
  mockSauceIngredient
} from '../__mocks__/ingredients';

describe('[ConstructorSlice] Тестирование конструктора бургеров', () => {
  const createInitialState = (
    bunItem: TConstructorIngredient | null = null,
    ingredients: TConstructorIngredient[] = []
  ) => ({
    constructorItems: {
      bun: bunItem,
      ingredients
    },
    orderRequestStatus: false,
    orderModalData: null,
    isLoading: false,
    errorMessage: null
  });

  describe('[addIngredient]', () => {
    it('добавляет основной ингредиент', () => {
      const state = createInitialState();
      const newState = burgerConstructorSlice.reducer(state, addIngredient(mockMainIngredient));

      expect(newState.constructorItems.ingredients).toHaveLength(1);
      expect(newState.constructorItems.ingredients[0]).toEqual({
        ...mockMainIngredient,
        id: expect.any(String)
      });
    });

    it('добавляет булку', () => {
      const state = createInitialState();
      const newState = burgerConstructorSlice.reducer(state, addIngredient(mockBunIngredient));

      expect(newState.constructorItems.bun).toEqual({
        ...mockBunIngredient,
        id: expect.any(String)
      });
    });
  });

  it('[removeIngredient] удаляет ингредиент', () => {
    const state = createInitialState(mockBunIngredient, [mockMainIngredient, mockSauceIngredient]);
    const newState = burgerConstructorSlice.reducer(state, removeIngredient(mockMainIngredient));

    expect(newState.constructorItems.ingredients).toHaveLength(1);
    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...mockSauceIngredient,
      id: expect.any(String)
    });
  });

  it('[moveIngredientUp] перемещает ингредиент вверх', () => {
    const state = createInitialState(mockBunIngredient, [mockMainIngredient, mockSauceIngredient]);
    const newState = burgerConstructorSlice.reducer(state, moveIngredientUp(1));

    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...mockSauceIngredient,
      id: expect.any(String)
    });
    expect(newState.constructorItems.ingredients[1]).toEqual({
      ...mockMainIngredient,
      id: expect.any(String)
    });
  });

  it('[moveIngredientDown] перемещает ингредиент вниз', () => {
    const state = createInitialState(mockBunIngredient, [mockMainIngredient, mockSauceIngredient]);
    const newState = burgerConstructorSlice.reducer(state, moveIngredientDown(0));

    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...mockSauceIngredient,
      id: expect.any(String)
    });
    expect(newState.constructorItems.ingredients[1]).toEqual({
      ...mockMainIngredient,
      id: expect.any(String)
    });
  });

  it('[resetOrder] очищает конструктор', () => {
    const state = createInitialState(mockBunIngredient, [mockMainIngredient, mockSauceIngredient]);
    const newState = burgerConstructorSlice.reducer(state, resetOrder());

    expect(newState.constructorItems).toEqual({
      bun: null,
      ingredients: []
    });
  });
});

describe('[ConstructorSlice] Создания заказа createOrder', () => {
  const baseState = {
    constructorItems: {
      bun: null,
      ingredients: []
    },
    orderRequestStatus: false,
    orderModalData: null,
    isLoading: false,
    errorMessage: null
  };

  it('pending: устанавливает флаг загрузки и сбрасывает ошибку', () => {
    const action = { type: createOrder.pending.type };
    const state = burgerConstructorSlice.reducer(baseState, action);

    expect(state.orderRequestStatus).toBe(true);
    expect(state.errorMessage).toBeNull();
  });

  it('fulfilled: обновляет orderModalData, очищает ингредиенты и сбрасывает флаг загрузки', () => {
    const action = {
      type: createOrder.fulfilled.type,
      payload: mockOrderResponse
    };

    const initial = {
      ...baseState,
      orderRequestStatus: true,
      constructorItems: {
        bun: mockBunIngredient,
        ingredients: [mockMainIngredient]
      }
    };

    const state = burgerConstructorSlice.reducer(initial, action);

    expect(state.orderRequestStatus).toBe(false);
    expect(state.orderModalData).toEqual(mockOrderResponse.order);
    expect(state.constructorItems.bun).toBeNull();
    expect(state.constructorItems.ingredients).toHaveLength(0);
    expect(state.errorMessage).toBeNull();
  });

  it('rejected: устанавливает сообщение об ошибке и сбрасывает флаг загрузки', () => {
    const action = {
      type: createOrder.rejected.type,
      error: { message: mockError.message }
    };

    const initial = {
      ...baseState,
      orderRequestStatus: true
    };

    const state = burgerConstructorSlice.reducer(initial, action);

    expect(state.orderRequestStatus).toBe(false);
    expect(state.errorMessage).toBe('Order failed');
  });
});
