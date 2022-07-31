import { initialStorageName, defaultUserAvatar, initialTimeOut, rejectChance } from './variables';
import { IBaseResponse } from '../types/serverResponses';
import { IServerDataBase, IServerUser, ITask_Server } from '../types/entity';


const _getDataBase = (): IServerDataBase => {
  return JSON.parse(localStorage.getItem(initialStorageName) || '{ users: [] }');
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
const _useUser = (authToken: string) => {
  const isAuth = _getDataBase().users.some(el => el.authToken === authToken);
  const findTask = (taskId: number) => {
    const dataBase = _getDataBase();
    try {
      return dataBase.users.find(el => el.authToken === authToken)?.tasks.some(el => el.id === taskId) || false;
    } catch {
      return false;
    }
  };
  const setTask = (task: ITask_Server): boolean => {
    const dataBase = _getDataBase();
    const isAuth = dataBase.users.some(el => el.authToken === authToken)
    const userdata = dataBase.users.find(el => el.authToken === authToken) || null;
    if (isAuth && userdata) {
      userdata.tasks.unshift(task);
      _setDataBase(dataBase);
      return true
    }
    return false;
  }
  const updateTask = (task: ITask_Server): boolean => {
    const dataBase = _getDataBase();



    const isAuth = dataBase.users.some(el => el.authToken === authToken)
    const userdata = dataBase.users.find(el => el.authToken === authToken) || null;
    const currentTaskIndex = userdata ? userdata.tasks.findIndex(el => el.id === task.id) : null;
    if (isAuth && userdata && currentTaskIndex) {
      userdata.tasks[currentTaskIndex] = {...task};
      _setDataBase(dataBase);
      return true
    }
    return false;
  }
  return { isAuth, setTask, updateTask, findTask }
}


export {
  _getDataBase,
  _checkAuth,
  _createRandomToken,
  _setDataBase,
  _setNewAccount,
  _createPromise,
  _useUser,
};