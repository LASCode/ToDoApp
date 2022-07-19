import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IReduxAuthData } from '../../../types/entity';

interface IAuthStore {
  authAccess: boolean,
  authIsFetching: boolean,
  authError: string | null,

  userData: IReduxAuthData | false,
  token: string | null,

  registerIsFetching: boolean,
  registerError: string | false,
}
const initialStore: IAuthStore = {
  authAccess: false,
  authIsFetching: false,
  authError: null,

  userData: false,
  token: null,

  registerIsFetching: false,
  registerError: false,
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


    authFetching(state: IAuthStore) {
      state.authIsFetching = true;
    },
    authFetchingSuccess(state: IAuthStore, action: PayloadAction<IReduxAuthData>) {
      state.authIsFetching = false;
      state.authError = null;
      state.authAccess = true

      state.userData = { ...action.payload };
    },
    authFetchingError(state: IAuthStore, action: PayloadAction<string>) {
      state.authIsFetching = false;
      state.authError = action.payload;
      state.authAccess = true

      state.token = '';
      state.userData = false;
    },

    registerFetching(state: IAuthStore) {
      state.registerIsFetching = true;
    },
    registerFetchingSuccess(state: IAuthStore, action: PayloadAction<string>) {
      state.registerIsFetching = false;
      state.registerError = false;
      state.token = action.payload;
    },
    registerFetchingError(state: IAuthStore, action: PayloadAction<string>) {
      state.registerIsFetching = false;
      state.registerError = action.payload;
    }
  },
})

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;