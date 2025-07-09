import { rootReducer } from '../store';
import store from '../store';

describe('[Store] Redux store', () => {
  it('должен вернуть текущий стейт при неизвестном action', () => {
    const unknownAction = { type: 'UNDEFINED_ACTION' };
    const expectedInitialState = store.getState();

    const stateFromReducer = rootReducer(undefined, unknownAction);

    expect(stateFromReducer).toEqual(expectedInitialState);
  });
});
