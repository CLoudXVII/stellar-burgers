import { TConstructorIngredient } from '@utils-types';

import burgerConstructorSlice, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  resetOrder
} from '../ConstructorSlice';

import { bunMock, mainMock, sauceMock } from '../__mocks__/ingredients';

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
      const newState = burgerConstructorSlice.reducer(state, addIngredient(mainMock));

      expect(newState.constructorItems.ingredients).toHaveLength(1);
      expect(newState.constructorItems.ingredients[0]).toEqual({
        ...mainMock,
        id: expect.any(String)
      });
    });

    it('добавляет булку', () => {
      const state = createInitialState();
      const newState = burgerConstructorSlice.reducer(state, addIngredient(bunMock));

      expect(newState.constructorItems.bun).toEqual({
        ...bunMock,
        id: expect.any(String)
      });
    });
  });

  it('[removeIngredient] удаляет ингредиент', () => {
    const state = createInitialState(bunMock, [mainMock, sauceMock]);
    const newState = burgerConstructorSlice.reducer(state, removeIngredient(mainMock));

    expect(newState.constructorItems.ingredients).toHaveLength(1);
    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...sauceMock,
      id: expect.any(String)
    });
  });

  it('[moveIngredientUp] перемещает ингредиент вверх', () => {
    const state = createInitialState(bunMock, [mainMock, sauceMock]);
    const newState = burgerConstructorSlice.reducer(state, moveIngredientUp(1));

    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...sauceMock,
      id: expect.any(String)
    });
    expect(newState.constructorItems.ingredients[1]).toEqual({
      ...mainMock,
      id: expect.any(String)
    });
  });

  it('[moveIngredientDown] перемещает ингредиент вниз', () => {
    const state = createInitialState(bunMock, [mainMock, sauceMock]);
    const newState = burgerConstructorSlice.reducer(state, moveIngredientDown(0));

    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...sauceMock,
      id: expect.any(String)
    });
    expect(newState.constructorItems.ingredients[1]).toEqual({
      ...mainMock,
      id: expect.any(String)
    });
  });

  it('[resetOrder] очищает конструктор', () => {
    const state = createInitialState(bunMock, [mainMock, sauceMock]);
    const newState = burgerConstructorSlice.reducer(state, resetOrder());

    expect(newState.constructorItems).toEqual({
      bun: null,
      ingredients: []
    });
  });
});
