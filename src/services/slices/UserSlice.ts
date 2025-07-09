import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { TUser } from '@utils-types';

import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '@api';

import { TRegisterData } from '../../utils/burger-api';
import { getCookie, setCookie, deleteCookie } from '../../utils/cookie';

interface UserState {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  user: TUser | null;
  loginUserError: null | string;
  loginUserRequest: boolean;
}

const initialState: UserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  loginUserError: null,
  loginUserRequest: false
};

export const userGetApi = createAsyncThunk('user/userApi', getUserApi);

export const userUpdateApi = createAsyncThunk('user/update', updateUserApi);

export const userSignUp = createAsyncThunk(
  'user/sign-up',
  async ({ email, password, name }: TRegisterData) => {
    const data = await registerUserApi({ email, password, name });

    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    return data.user;
  }
);

export const userSignIn = createAsyncThunk(
  'user/sign-in',
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const data = await loginUserApi({ email, password });

    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    return data.user;
  }
);

export const userSignOut = createAsyncThunk(
  'user/sign-out',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      deleteCookie('accessToken');
      localStorage.clear();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: 'userstate',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userGetApi.pending, (state) => {
        state.isAuthenticated = false;
        state.loginUserError = null;
        state.user = null;
        state.loginUserRequest = true;
      })
      .addCase(userGetApi.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.loginUserRequest = false;
      })
      .addCase(userGetApi.rejected, (state, action) => {
        state.loginUserError =
          action.error.message || 'Failed to fetch user data';
        state.isAuthenticated = false;
        state.user = null;
        state.isAuthChecked = true;
        state.loginUserRequest = false;
      })
      .addCase(userSignUp.pending, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loginUserRequest = true;
      })
      .addCase(userSignUp.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loginUserRequest = false;
      })
      .addCase(userSignUp.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.loginUserError = action.error.message || 'Failed to sign up';
        state.loginUserRequest = false;
      })
      .addCase(userSignIn.pending, (state) => {
        state.loginUserError = null;
        state.loginUserRequest = true;
      })
      .addCase(userSignIn.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loginUserRequest = false;
        state.isAuthChecked = true;
      })
      .addCase(userSignIn.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.error.message || 'Failed to sign in';
        state.isAuthChecked = true;
      })
      .addCase(userSignOut.pending, (state) => {
        state.isAuthenticated = true;
        state.loginUserRequest = true;
      })
      .addCase(userSignOut.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.loginUserRequest = false;
        state.user = null;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(userSignOut.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.loginUserRequest = false;
        state.loginUserError = action.error.message || 'Failed to sign out';
      })
      .addCase(userUpdateApi.pending, (state) => {
        state.isAuthenticated = true;
        state.loginUserRequest = true;
      })
      .addCase(userUpdateApi.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.loginUserRequest = false;
      })
      .addCase(userUpdateApi.rejected, (state, action) => {
        state.loginUserError =
          action.error.message || 'Failed to update user information';
        state.loginUserRequest = false;
      });
  },
  selectors: {
    getUser: (state) => state.user,
    getAuthStatus: (state) => state.isAuthenticated,
    getSignInError: (state) => state.loginUserError,
    getAuthCheckStatus: (state) => state.isAuthChecked,
    getUserRequestStatus: (state) => state.loginUserRequest
  }
});

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(userGetApi()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);

export const { authChecked } = userSlice.actions;
export default userSlice;

export const {
  getUser,
  getAuthStatus,
  getSignInError,
  getAuthCheckStatus,
  getUserRequestStatus
} = userSlice.selectors;
