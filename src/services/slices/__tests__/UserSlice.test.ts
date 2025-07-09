import {
  UserState,
  userSignUp,
  userSignIn,
  userSignOut,
  userUpdate,
  userSlice,
  authChecked
} from '../UserSlice';

import {
  mockUser,
  mockLoginData,
  mockRegisterData,
  mockUpdatedUser
} from '../__mocks__/user';

const initialState: UserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  loginUserError: null,
  loginUserRequest: false
};

describe('[UserSlice] Проверка входа', () => {
  it('authChecked устанавливает isAuthChecked в true', () => {
    const state = userSlice.reducer(initialState, authChecked());
    expect(state).toEqual({ ...initialState, isAuthChecked: true });
  });
});

describe('[UserSlice] Регистрация аккаунта userSignUp', () => {
  it('pending: устанавливает loginUserRequest в true', () => {
    const state = userSlice.reducer(initialState, userSignUp.pending('', mockRegisterData));
    expect(state).toEqual({ ...initialState, loginUserRequest: true });
  });

  it('fulfilled: сохраняет пользователя и устанавливает isAuthenticated', () => {
    const state = userSlice.reducer(initialState, userSignUp.fulfilled(mockUser, '', mockRegisterData));
    expect(state).toEqual({
      ...initialState,
      user: mockUser,
      isAuthenticated: true,
      loginUserRequest: false
    });
  });

  it('rejected: сохраняет сообщение об ошибке', () => {
    const error = new Error('User register error');
    const state = userSlice.reducer(initialState, userSignUp.rejected(error, '', mockRegisterData));
    expect(state).toEqual({
      ...initialState,
      isAuthenticated: false,
      loginUserError: error.message,
      loginUserRequest: false
    });
  });
});

describe('[UserSlice] Вход в аккаунт userSignIn', () => {
  it('pending: сбрасывает ошибку и включает loginUserRequest', () => {
    const state = userSlice.reducer(initialState, userSignIn.pending('', mockLoginData));
    expect(state).toEqual({
      ...initialState,
      loginUserError: null,
      loginUserRequest: true
    });
  });

  it('fulfilled: сохраняет пользователя и устанавливает isAuthenticated и isAuthChecked', () => {
    const state = userSlice.reducer(initialState, userSignIn.fulfilled(mockUser, '', mockLoginData));
    expect(state).toEqual({
      ...initialState,
      user: mockUser,
      isAuthenticated: true,
      isAuthChecked: true,
      loginUserRequest: false
    });
  });

  it('rejected: сохраняет сообщение об ошибке и сбрасывает флаги', () => {
    const error = new Error('User Log in Error');
    const state = userSlice.reducer(initialState, userSignIn.rejected(error, '', mockLoginData));
    expect(state).toEqual({
      ...initialState,
      isAuthChecked: true,
      loginUserRequest: false,
      isAuthenticated: false,
      loginUserError: error.message
    });
  });
});

describe('[UserSlice] Выход из аккаунта userSignOut', () => {
  const authenticatedState = {
    ...initialState,
    isAuthenticated: true,
    user: mockUser
  };

  it('pending: включает loginUserRequest', () => {
    const state = userSlice.reducer(authenticatedState, userSignOut.pending(''));
    expect(state).toEqual({
      ...authenticatedState,
      loginUserRequest: true
    });
  });

  it('fulfilled: сбрасывает авторизацию и пользователя', () => {
    const state = userSlice.reducer(authenticatedState, userSignOut.fulfilled(undefined, ''));
    expect(state).toEqual({
      isAuthenticated: false,
      user: null,
      loginUserRequest: false,
      isAuthChecked: false,
      loginUserError: null
    });
  });

  it('rejected: сохраняет ошибку и сбрасывает авторизацию', () => {
    const error = new Error('Failed to log out');
    const state = userSlice.reducer(authenticatedState, userSignOut.rejected(error, ''));
    expect(state).toEqual({
      ...authenticatedState,
      isAuthenticated: false,
      loginUserError: error.message,
      loginUserRequest: false
    });
  });
});

describe('[UserSlice] Обновление данных аккаунта userUpdate', () => {
  it('pending: включает loginUserRequest и устанавливает isAuthenticated', () => {
    const state = userSlice.reducer(initialState, userUpdate.pending('', mockUpdatedUser.user));
    expect(state).toEqual({
      ...initialState,
      isAuthenticated: true,
      loginUserRequest: true
    });
  });

  it('fulfilled: обновляет пользователя', () => {
    const state = userSlice.reducer(initialState, userUpdate.fulfilled(mockUpdatedUser, '', mockUser));
    expect(state).toEqual({
      isAuthenticated: true,
      user: mockUpdatedUser.user,
      loginUserRequest: false,
      isAuthChecked: false,
      loginUserError: null
    });
  });

  it('rejected: сохраняет сообщение об ошибке', () => {
    const error = new Error('Failed to fetch update user');
    const state = userSlice.reducer(initialState, userUpdate.rejected(error, '', mockUser));
    expect(state).toEqual({
      ...initialState,
      loginUserError: error.message,
      loginUserRequest: false
    });
  });
});
