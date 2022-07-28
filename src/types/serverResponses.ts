import { ITask, IServerUserShort, ITask_Server } from './entity';

interface IBaseResponse<T> {
  ok: boolean,
  status: number,
  data: T,
}

interface IRegisterResponseData {
  success: boolean,
  error: string | false,
  token: string | false,
}

interface ILoginResponseData {
  success: boolean,
  error: string | false,
  token: string | false,
}

interface IAuthResponseData {
  success: boolean,
  error: string | null,
  userData: IServerUserShort | null,
}

interface ILogoutUserData<T> {
  success: boolean,
  error: string | null,
  userData: T,
}

interface ITasksResponseData<T> {
  success: boolean,
  error: string | null,
  tasks: T,
}

interface ITaskResponseSynchronizeData {
  success: boolean,
  error: string | null,
  task: ITask_Server | null,
}


export type {
  IBaseResponse,
  IAuthResponseData,
  ILoginResponseData,
  ITasksResponseData,
  IRegisterResponseData,
  ILogoutUserData,
  ITaskResponseSynchronizeData,
};