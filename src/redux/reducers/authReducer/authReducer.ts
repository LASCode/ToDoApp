import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IReduxAuthData, IServerUserShort } from '../../../types/entity';
import { IAuthResponseData } from '../../../types/serverResponses';
import { LSVariables } from '../../../vriables/variables';
import { getAuthToken } from '../../../features/get-auth-token';

interface IAuthStore {
  userData: IReduxAuthData | false,
  access: boolean,
  authorized: boolean,
  logoutMenu: boolean,
  isFetching: boolean,
  token: string | null,
  error: string | false,

  registerIsFetching: boolean,
  registerError: string | false,
}
const initialStore: IAuthStore = {
  userData: false,
  access: false,
  authorized: false,
  isFetching: false,
  logoutMenu: false,
  token: null,
  error: false,

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
      state.access = true;
    },


    authFetching(state: IAuthStore) {
      state.isFetching = true;
    },
    authFetchingSuccess(state: IAuthStore, action: PayloadAction<IReduxAuthData>) {
      state.isFetching = false;
      state.error = false;
      state.logoutMenu = false;
      state.access = true;
      state.authorized = true;
      state.userData = { ...action.payload };
    },
    authFetchingError(state: IAuthStore, action: PayloadAction<string>) {
      state.error = action.payload;
      state.logoutMenu = true;
      state.access = true;
      state.isFetching = false;
      state.authorized = false;
      state.token = '';
      state.userData = false;
    },

    registerFetching(state: IAuthStore) {
      state.registerIsFetching = true;
    },
    registerFetchingSuccess(state: IAuthStore, action: PayloadAction<string>) {
      state.registerIsFetching = false;
      state.registerError = false;
      state.authorized = true;
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