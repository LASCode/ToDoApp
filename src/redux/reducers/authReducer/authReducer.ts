import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IReduxAuthData } from '../../../types/entity';
import { fetchAuth, fetchLogin, fetchRegister } from '../../actions';

interface IAuthStore {
  authAccess: boolean,
  authIsFetching: boolean,
  authError: string | null,
  authSuccess: boolean,

  userData: IReduxAuthData | null,
  token: string | null,

  registerIsFetching: boolean,
  registerError: string | null,

  loginIsFetching: boolean,
  loginError: string | null
}
const initialStore: IAuthStore = {
  authAccess: false,
  authIsFetching: false,
  authError: null,
  authSuccess: false,

  userData: null,
  token: null,

  registerIsFetching: false,
  registerError: null,

  loginIsFetching: false,
  loginError: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialStore,
  reducers: {
    setToken(state: IAuthStore, action: PayloadAction<string>){
      state.token = action.payload;
    },
    setAccess(state: IAuthStore) {
      state.authAccess = true;
    },
    logOut(state: IAuthStore) {
      state.token = null;
      state.userData = null;
      state.authSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state: IAuthStore) => {
        state.authIsFetching = true;
        state.authError = null;
      })
      .addCase(fetchAuth.fulfilled, (state: IAuthStore, action) => {
        state.authIsFetching = false;
        state.authError = null;
        state.authAccess = true;
        state.authSuccess = action.payload.data.success;
        state.token = action.payload.data.success ? state.token : null;
        state.userData = action.payload.data.success ? action.payload.data.userData : null;
      })
      .addCase(fetchAuth.rejected, (state: IAuthStore) => {
        state.authIsFetching = false;
        state.authError = 'Произошла ошипка сервера, извинити';
        state.authAccess = true;
      })

      .addCase(fetchRegister.pending, (state: IAuthStore) => {
        state.registerIsFetching = true;
        state.registerError = null;
      })
      .addCase(fetchRegister.fulfilled, (state: IAuthStore, action) => {
        state.registerIsFetching = false;
        state.registerError = action.payload.data.error ? action.payload.data.error : null;
        state.token = action.payload.data.success ? action.payload.data.token as string : null;
      })
      .addCase(fetchRegister.rejected, (state: IAuthStore) => {
        state.registerIsFetching = false;
        state.registerError = 'Сервер отменил запрос, попробуйте снова';
      })

      .addCase(fetchLogin.pending, (state: IAuthStore) => {
        state.loginIsFetching = true;
        state.loginError = null;
      })
      .addCase(fetchLogin.fulfilled, (state: IAuthStore, action) => {
        state.loginIsFetching = false;
        state.loginError = action.payload.data.error ? action.payload.data.error : null;
        state.token = action.payload.data.success ? action.payload.data.token as string : null;
      })
      .addCase(fetchLogin.rejected, (state: IAuthStore) => {
        state.loginIsFetching = false;
        state.loginError = 'Сервер отменил запрос, попробуйте снова';
      })
  }
})

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;