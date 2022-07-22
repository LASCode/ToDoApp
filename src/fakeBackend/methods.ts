import { initialStorageName, defaultUserAvatar, initialTimeOut, rejectChance } from './variables';
import { IBaseResponse } from '../types/serverResponses';
import { IServerDataBase, IServerUser } from '../types/entity';
import { rejects } from 'assert';


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
    authToken: newToken,
    username: username,
    avatar: defaultUserAvatar,
    tokens: 0,
    tasks: []
  };
  dataBase.users.push(newAccount);
  _setDataBase(dataBase);
  return newToken;
}
const _checkAuth = (authToken: string): boolean => {
  const dataBase: IServerDataBase = _getDataBase();
  return dataBase.users.some(el => el.authToken === authToken);
}
const _createPromise = <T>(body: T, timeout: number = initialTimeOut): Promise<IBaseResponse<T>> => {
  const chance = Math.random();
  return new Promise<IBaseResponse<T>>((resolve, reject) => setTimeout(() => {
    if (chance >= rejectChance) {
      resolve({
        ok: true,
        status: 200,
        data: body,
      })
    } else {
      console.log('Promise Failed')
      reject('1');
    }
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