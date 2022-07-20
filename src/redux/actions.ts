import { AppDispatch } from './store';
import { asyncServerRequest } from '../fakeBackend';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IAuthResponseData,
  IBaseResponse,
  ILoginResponseData,
  IRegisterResponseData,
  ITasksResponseData
} from '../types/serverResponses';

const fetchAuth = createAsyncThunk<IBaseResponse<IAuthResponseData>, string>(
  'auth/fetchAuth',
  async (token, {}) => {
    const { checkAuth } = asyncServerRequest;
    return await checkAuth(token);
  }
);
const fetchRegister = createAsyncThunk<IBaseResponse<IRegisterResponseData>,{username: string, password: string, login: string}>(
  'auth/fetchRegister',
  async (registerData, {}) => {
    const { register } = asyncServerRequest;
    return await register(registerData.login, registerData.password, registerData.username);
  },
);
const fetchLogin = createAsyncThunk<IBaseResponse<ILoginResponseData>, {login: string, password: string}>(
  'auth/fetchLogin',
  async (loginData, {}) => {
    const { login } = asyncServerRequest;
    return await login(loginData.login, loginData.password);
  }
);
const fetchTasks = createAsyncThunk<IBaseResponse<ITasksResponseData>, string>(
  'task/fetchTask',
  async (token, {}) => {
    const { getTasks } = asyncServerRequest;
    return await getTasks(token);
  }
)

export { fetchAuth, fetchRegister, fetchLogin, fetchTasks }