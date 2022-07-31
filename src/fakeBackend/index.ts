import {
  _setNewAccount,
  _getDataBase,
  _setDataBase,
  _checkAuth,
  _createPromise,
  _createRandomToken,
  _useUser
} from './methods';
import { initialStorageName, initialTimeOut, initialDataBase } from './variables';
import {
  IAuthResponseData,
  IBaseResponse,
  ILoginResponseData, ILogoutUserData,
  IRegisterResponseData, ITaskResponseSynchronizeData, ITaskResponseUpdateData,
  ITasksResponseData
} from '../types/serverResponses';
import { IServerDataBase, IServerUser, ITask_Server } from '../types/entity';


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
        error: null,
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
        userData: null
      })
    },
    unknownError: () => {
      return _createPromise<IAuthResponseData>({
        success: false,
        error: 'Unknown error in "CheckAuthFunc"',
        userData: null
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
const logout = (authToken: string): Promise<IBaseResponse<ILogoutUserData<null>>> => {
  const dataBase: IServerDataBase = _getDataBase();
  const userWasFound = dataBase.users.some(el => el.authToken === authToken);
  const sendResponse = {
    success: () => {
      const userData = dataBase.users.find(el => el.authToken === authToken) as IServerUser;
      userData.authToken = _createRandomToken();
      _setDataBase(dataBase)
      return _createPromise<ILogoutUserData<null>>({
        success: true,
        error: null,
        userData: null
      })
    },
    unauthorized: () => {
      return _createPromise<ILogoutUserData<null>>({
        success: false,
        error: 'Token not found',
        userData: null
      })
    },
    unknownError: () => {
      return _createPromise<ILogoutUserData<null>>({
        success: false,
        error: 'Unknown error in "CheckAuthFunc"',
        userData: null
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

//tasks
const getTasks = (authToken: string): Promise<IBaseResponse<ITasksResponseData<ITask_Server[]>>> => {
  const dataBase: IServerDataBase = _getDataBase();
  const authorized = _checkAuth(authToken);
  const sendResponse = {
    success: () => {
      const userData = dataBase.users.find(el => el.authToken === authToken) as IServerUser;
      return _createPromise<ITasksResponseData<ITask_Server[]>>({
        success: true,
        error: null,
        tasks: userData.tasks,
      })
    },
    unauthorized: () => {
      return _createPromise<ITasksResponseData<ITask_Server[]>>({
        success: false,
        error: 'Unauthorized',
        tasks: [],
      })
    },
    unknownError: () => {
      return _createPromise<ITasksResponseData<ITask_Server[]>>({
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
const setTasks = (authToken: string, tasks: ITask_Server[]): Promise<IBaseResponse<ITasksResponseData<ITask_Server[]>>> => {
  const dataBase: IServerDataBase = _getDataBase();
  const authorized = _checkAuth(authToken);
  const sendResponse = {
    success: () => {
      const userData = dataBase.users.find(el => el.authToken === authToken) as IServerUser;
      userData.tasks = tasks;
      _setDataBase(dataBase)
      return _createPromise<ITasksResponseData<ITask_Server[]>>({
        success: true,
        error: null,
        tasks: userData.tasks,
      })
    },
    unauthorized: () => {
      return _createPromise<ITasksResponseData<ITask_Server[]>>({
        success: false,
        error: 'Unauthorized',
        tasks: [],
      })
    },
    unknownError: () => {
      return _createPromise<ITasksResponseData<ITask_Server[]>>({
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
const setTask = (authToken: string, task: ITask_Server): Promise<IBaseResponse<ITaskResponseSynchronizeData>> => {
  const dataBase: IServerDataBase = _getDataBase();
  const authorized = _checkAuth(authToken);
  const sendResponse = {
    success: () => {
      const userData = dataBase.users.find(el => el.authToken === authToken) as IServerUser;
      userData.tasks.unshift(task);
      _setDataBase(dataBase)
      return _createPromise<ITaskResponseSynchronizeData>({
        success: true,
        error: null,
        task: task,
      })
    },
    unauthorized: () => {
      return _createPromise<ITaskResponseSynchronizeData>({
        success: false,
        error: 'Unauthorized',
        task: null,
      })
    },
    unknownError: () => {
      return _createPromise<ITaskResponseSynchronizeData>({
        success: false,
        error: 'Unknown error in "GetTasksFunc"',
        task: null,
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
const updateTask = (authToken: string, task: ITask_Server): Promise<IBaseResponse<ITaskResponseSynchronizeData>> => {
  const { isAuth, updateTask, findTask } = _useUser(authToken);
  const sendResponse = {
    success: () => {
      updateTask(task);
      return _createPromise<ITaskResponseSynchronizeData>({
        success: true,
        error: null,
        task: task,
      })
    },
    taskNotFound: () => {
      return _createPromise<ITaskResponseSynchronizeData>({
        success: false,
        error: 'Task not found',
        task: null,
      })
    },
    unauthorized: () => {
      return _createPromise<ITaskResponseSynchronizeData>({
        success: false,
        error: 'Unauthorized',
        task: null,
      })
    },
    unknownError: () => {
      return _createPromise<ITaskResponseSynchronizeData>({
        success: false,
        error: 'Unknown error in "updateTask"',
        task: null,
      })
    }
  }

  switch (true) {
    case isAuth:
      return sendResponse.success();
    case !isAuth:
      return sendResponse.unauthorized();
    case !findTask(task.id):
      return sendResponse.taskNotFound();
    default:
      return sendResponse.unknownError();
  }
}

const test = (authToken: string, tasks: ITask_Server[]): Promise<IBaseResponse<ITaskResponseUpdateData>> => {
  const { findTask } = _useUser(authToken);
  const dataBase: IServerDataBase = _getDataBase();
  const isAuthorized = _checkAuth(authToken);
  const tasksNotFound: number[] = tasks.reduce((prev: number[], curr) => !findTask(curr.id) ? [...prev, curr.id] : [...prev], []);

  try {
    switch (true) {
      case !isAuthorized: return _createPromise({success: false, error: 'AuthTokenFailed', tasks: null})
      case !!tasksNotFound.length: return _createPromise({success: false, error: `${tasksNotFound.join(', ')} task not found`, tasks: null})
      default: return _createPromise({success: true, error: null, tasks: tasks});
    }
  } catch {
    return _createPromise({success: false, error: 'unc error', tasks: null})
  }

}


const asyncServerRequest = {
  register,
  login,
  checkAuth,
  logout,
  getTasks,
  setTasks,
  setTask,
  updateTask,
}

export {
  createFakeBackend,
  asyncServerRequest,
}