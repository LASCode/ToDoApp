import { _setNewAccount, _getDataBase, _setDataBase, _checkAuth, _createPromise } from './methods';
import { initialStorageName, initialTimeOut, initialDataBase } from './variables';
import {
  IAuthResponseData,
  IBaseResponse,
  ILoginResponseData,
  IRegisterResponseData,
  ITasksResponseData
} from '../types/serverResponses';
import { IServerDataBase, ITask, IServerUser } from '../types/entity';



//initialMethod
const createFakeBackend = (data: IServerDataBase = initialDataBase) => {
  if (!localStorage.getItem(initialStorageName)) {
    localStorage.setItem(initialStorageName, JSON.stringify(initialDataBase));
  }
}

//auth
const register = (login: string, password: string, username: string): Promise<IBaseResponse<IRegisterResponseData>> => {
  const dataBase: IServerDataBase = _getDataBase();
  const loginAlreadyTaken = dataBase.users.some(el => el.login === login);
  const usernameAlreadyTaken = dataBase.users.some(el => el.username === username);
  const passwordIsShort = password.length < 5;
  const allIsValid = !loginAlreadyTaken && !usernameAlreadyTaken && !passwordIsShort
  const sendResponse = {
    success: () => {
      return _createPromise<IRegisterResponseData>({
        success: true,
        error: false,
        token: _setNewAccount(login, password, username),
      })
    },
    loginAlreadyTaken: () => {
      return _createPromise<IRegisterResponseData>({
        success: false,
        error: 'Login is already taken',
        token: false,
      })
    },
    usernameAlreadyTaken: () => {
      return _createPromise<IRegisterResponseData>({
        success: false,
        error: 'Username is already taken',
        token: false,
      })
    },
    passwordIsShort: () => {
      return _createPromise<IRegisterResponseData>({
        success: false,
        error: 'Password shorter than 5 characters',
        token: false,
      })
    },
    unknownError: () => {
      return _createPromise<IRegisterResponseData>({
        success: false,
        error: 'Unknown error in "RegisterFunc"',
        token: false,
      })
    }
  }

  switch (true) {
    case allIsValid:
      return sendResponse.success();
    case loginAlreadyTaken:
      return sendResponse.loginAlreadyTaken();
    case usernameAlreadyTaken:
      return sendResponse.usernameAlreadyTaken();
    case passwordIsShort:
      return sendResponse.passwordIsShort();
    default:
      return sendResponse.unknownError();
  }
}
const login = (login: string, password: string): Promise<IBaseResponse<ILoginResponseData>> => {
  const dataBase: IServerDataBase = _getDataBase();
  const userWasFound = dataBase.users.some(el => el.login === login && el.password === password);
  const sendResponse = {
    success: () => {
      const userData = dataBase.users.find(el => (el.login === login && el.password === password)) as IServerUser;
      return _createPromise<ILoginResponseData>({
        success: true,
        error: false,
        token: userData.authToken,
      })
    },
    incorrectData: () => {
      return _createPromise<ILoginResponseData>({
        success: false,
        error: 'Login or password is incorrect',
        token: false,
      })
    },
    unknownError: () => {
      return _createPromise<ILoginResponseData>({
        success: false,
        error: 'Unknown error in "LoginFunc"',
        token: false,
      })
    }
  }

  switch (true) {
    case userWasFound:
      return sendResponse.success();
    case !userWasFound:
      return sendResponse.incorrectData();
    default:
      return sendResponse.unknownError();
  }
}
const checkAuth = (authToken: string): Promise<IBaseResponse<IAuthResponseData>> => {
  const dataBase: IServerDataBase = _getDataBase();
  const userWasFound = dataBase.users.some(el => el.authToken === authToken);
  const sendResponse = {
    success: () => {
      const userData = dataBase.users.find(el => el.authToken === authToken) as IServerUser;
      return _createPromise<IAuthResponseData>({
        success: true,
        error: false,
        userData: {
          id: userData.id,
          login: userData.login,
          authToken: userData.authToken,
          username: userData.username,
          avatar: userData.avatar,
          tokens: userData.tokens,
        }
      })
    },
    unauthorized: () => {
      return _createPromise<IAuthResponseData>({
        success: false,
        error: 'UserInfo not found',
        userData: {
          id: NaN,
          tokens: NaN,
          login: '',
          authToken: '',
          username: '',
          avatar: '',
        }
      })
    },
    unknownError: () => {
      return _createPromise<IAuthResponseData>({
        success: false,
        error: 'Unknown error in "CheckAuthFunc"',
        userData: {
          id: NaN,
          login: '',
          authToken: '',
          username: '',
          avatar: '',
          tokens: NaN,
        }
      })
    }
  }

  switch (true) {
    case userWasFound:
      return sendResponse.success();
    case !userWasFound:
      return sendResponse.unauthorized();
    default:
      return sendResponse.unknownError();
  }
}
const logout = (authToken: string) => {}

//tasks
const getTasks = (authToken: string): Promise<IBaseResponse<ITasksResponseData>> => {
  const dataBase: IServerDataBase = _getDataBase();
  const authorized = _checkAuth(authToken);
  const sendResponse = {
    success: () => {
      const userData = dataBase.users.find(el => el.authToken === authToken) as IServerUser;
      return _createPromise<ITasksResponseData>({
        success: true,
        error: false,
        tasks: userData.tasks,
      })
    },
    unauthorized: () => {
      return _createPromise<ITasksResponseData>({
        success: false,
        error: 'Unauthorized',
        tasks: [],
      })
    },
    unknownError: () => {
      return _createPromise<ITasksResponseData>({
        success: false,
        error: 'Unknown error in "GetTasksFunc"',
        tasks: [],
      })
    }
  }

  switch (true) {
    case authorized:
      return sendResponse.success();
    case !authorized:
      return sendResponse.unauthorized();
    default:
      return sendResponse.unknownError();
  }
}
const setTasks = (authToken: string, tasks: ITask[]): Promise<IBaseResponse<ITasksResponseData>> => {
  const dataBase: IServerDataBase = _getDataBase();
  const authorized = _checkAuth(authToken);
  const sendResponse = {
    success: () => {
      const userData = dataBase.users.find(el => el.authToken === authToken) as IServerUser;
      userData.tasks = tasks;
      _setDataBase(dataBase)
      return _createPromise<ITasksResponseData>({
        success: true,
        error: false,
        tasks: userData.tasks,
      })
    },
    unauthorized: () => {
      return _createPromise<ITasksResponseData>({
        success: false,
        error: 'Unauthorized',
        tasks: [],
      })
    },
    unknownError: () => {
      return _createPromise<ITasksResponseData>({
        success: false,
        error: 'Unknown error in "GetTasksFunc"',
        tasks: [],
      })
    }
  }

  switch (true) {
    case authorized:
      return sendResponse.success();
    case !authorized:
      return sendResponse.unauthorized();
    default:
      return sendResponse.unknownError();
  }










  // const dataBase = _getDataBase();
  // const authorized = dataBase.users.some(el => el.token === authToken);
  // const accountsData = dataBase.users.find(el => el.token === authToken);
  //
  // if (authorized && accountsData !== undefined) {
  //   accountsData.tasks = tasks;
  //   _setDataBase(dataBase);
  //   return _createPromise<ITaskResponse>({ ok: true, error: '' })
  // } else {
  //   return _createPromise<ITaskResponse>({ ok: false, error: 'unauthorized' })
  // }
}

const asyncServerRequest = {
  register,
  login,
  checkAuth,
  logout,
  getTasks,
  setTasks,
}

export {
  createFakeBackend,
  asyncServerRequest,
}