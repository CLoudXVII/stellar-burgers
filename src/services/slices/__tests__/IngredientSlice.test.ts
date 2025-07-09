import ingredientsSlice, {
  getIngredients,
  IngredientState
} from '../IngredientSlice';

import { bunMock, mainMock, sauceMock } from '../__mocks__/ingredients';

const initialState: IngredientState = {
  ingredients: [],
  isLoading: false,
  errorMessage: null
};

describe('[IngredientSlice] Загрузка ингредиентов', () => {
  it('устанавливает isLoading в true и сбрасывает ошибку при загрузке', () => {
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

  it('сохраняет ингредиенты и сбрасывает isLoading при успешной загрузке', () => {
    const state = ingredientsSlice.reducer(
      { ...initialState, isLoading: true },
      getIngredients.fulfilled([bunMock, mainMock, sauceMock], '')
    );

    expect(state).toEqual({
      ingredients: [bunMock, mainMock, sauceMock],
      isLoading: false,
      errorMessage: null
    });
  });

  it('сохраняет сообщение об ошибке и сбрасывает isLoading при неудачной загрузке', () => {
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
