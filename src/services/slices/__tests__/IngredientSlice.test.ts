import ingredientsSlice, {
  getIngredients,
  IngredientState
} from '../IngredientSlice';

import { mockBunIngredient, mockMainIngredient, mockSauceIngredient } from '../__mocks__/ingredients';

const initialState: IngredientState = {
  ingredients: [],
  isLoading: false,
  errorMessage: null
};

describe('[IngredientSlice] Загрузка ингредиентов getIngredients', () => {
  it('pending: устанавливает isLoading в true и сбрасывает ошибку', () => {
    const state = ingredientsSlice.reducer(
      { ...initialState, errorMessage: 'Test err' },
      getIngredients.pending('')
    );

    expect(state).toEqual({
      ingredients: [],
      isLoading: true,
      errorMessage: null
    });
  });

  it('fulfilled: сохраняет ингредиенты и сбрасывает isLoading', () => {
    const state = ingredientsSlice.reducer(
      { ...initialState, isLoading: true },
      getIngredients.fulfilled([mockBunIngredient, mockMainIngredient, mockSauceIngredient], '')
    );

    expect(state).toEqual({
      ingredients: [mockBunIngredient, mockMainIngredient, mockSauceIngredient],
      isLoading: false,
      errorMessage: null
    });
  });

  it('rejected: сохраняет сообщение об ошибке и сбрасывает isLoading', () => {
    const error = new Error('Test err');

    const state = ingredientsSlice.reducer(
      { ...initialState, isLoading: true },
      getIngredients.rejected(error, '')
    );

    expect(state).toEqual({
      ingredients: [],
      isLoading: false,
      errorMessage: 'Test err'
    });
  });
});
