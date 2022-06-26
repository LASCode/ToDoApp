import { initialStorageName, defaultUserAvatar, initialTimeOut } from './variables';
import { IBaseResponse } from '../types/serverResponses';
import { IServerDataBase, IServerUser } from '../types/entity';


const _getDataBase = (): IServerDataBase => {
  return JSON.parse(localStorage.getItem(initialStorageName) || '{}');
}
const _setDataBase = (data: IServerDataBase) => {
  localStorage.setItem(initialStorageName, JSON.stringify(data));
}
const _createRandomToken = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
const _setNewAccount = (login: string, password: string, username: string): string => {
  const dataBase: IServerDataBase = _getDataBase();
  const newToken = _createRandomToken();
  const newAccount: IServerUser = {
    id: dataBase.users.length + 1,
    login: login,
    password: password,
    token: newToken,
    username: username,
    avatar: defaultUserAvatar,
    tasks: []
  };
  dataBase.users.push(newAccount);
  _setDataBase(dataBase);
  return newToken;
}
const _checkAuth = (authToken: string): boolean => {
  const dataBase: IServerDataBase = _getDataBase();
  return dataBase.users.some(el => el.token === authToken);
}
const _createPromise = <T>(body: T, timeout: number = initialTimeOut): Promise<IBaseResponse<T>> => {
  return new Promise<IBaseResponse<T>>(resolve => setTimeout(() => {
    resolve({
      ok: true,
      status: 200,
      data: body,
    })
  }, timeout))
}


export {
  _getDataBase,
  _checkAuth,
  _createRandomToken,
  _setDataBase,
  _setNewAccount,
  _createPromise,
};