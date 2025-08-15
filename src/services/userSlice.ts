import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

type TUserState = {
  user: TUser | null;
  isLoading: boolean;
  isInit: boolean;
  error: string | null;
};
const initialState: TUserState = {
  user: null,
  isLoading: false,
  isInit: false,
  error: null
};

export const loginUserThunk = createAsyncThunk<
  { user: TUser; accessToken: string; refreshToken: string },
  { email: string; password: string }
>('user/login', async (credentials) => loginUserApi(credentials));

export const registerUserThunk = createAsyncThunk<
  { user: TUser; accessToken: string; refreshToken: string },
  { email: string; password: string; name: string }
>('user/register', async (userData) => registerUserApi(userData));

export const getUserThunk = createAsyncThunk<TUser, void>(
  'user/getUser',
  async () => {
    const response = await getUserApi();
    return response.user;
  }
);

export const updateUserThunk = createAsyncThunk<
  TUser,
  { email: string; name: string; password?: string }
>('user/updateUser', async (userData) => {
  const response = await updateUserApi(userData);
  return response.user;
});

export const logoutUserThunk = createAsyncThunk<void, void>(
  'user/logout',
  async () => {
    await logoutApi();
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setInit: (state) => {
      state.isInit = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.error = null;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка входа';
      })

      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.error = null;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка регистрации';
      })

      .addCase(getUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isInit = true;
        state.error = null;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isInit = true;
        if (
          action.error.message?.includes('jwt expired') ||
          action.error.message?.includes('401') ||
          action.error.message?.includes('Unauthorized')
        ) {
          state.user = null;
          localStorage.removeItem('refreshToken');
        }
        state.error =
          action.error.message || 'Ошибка получения данных пользователя';
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        if (
          action.error.message?.includes('jwt expired') ||
          action.error.message?.includes('401')
        ) {
          state.user = null;
          localStorage.removeItem('refreshToken');
        }

        state.error = action.error.message || 'Ошибка обновления данных';
      })

      .addCase(logoutUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.error = null;
        localStorage.removeItem('refreshToken');
      })
      .addCase(logoutUserThunk.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        localStorage.removeItem('refreshToken');
      });
  }
});

export const { clearError, setInit } = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state: { user: TUserState }) => state.user.user;
export const selectIsAuthenticated = (state: { user: TUserState }) =>
  !!state.user.user;
export const selectUserLoading = (state: { user: TUserState }) =>
  state.user.isLoading;
export const selectUserInit = (state: { user: TUserState }) =>
  state.user.isInit;
export const selectUserError = (state: { user: TUserState }) =>
  state.user.error;
