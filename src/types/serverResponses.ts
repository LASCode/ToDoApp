import { ITask, IServerUserShort, ITask_Server } from './entity';

interface IBaseResponse<T> {
  ok: boolean,
  status: number,
  data: T,
}
interface IDefaultResponseData {
  success: boolean,
  error: string | null,
}

interface ICheckAuthResponseData extends IDefaultResponseData {}
interface IAuthResponseData extends IDefaultResponseData {
  userData: IServerUserShort | null,
}
interface IRegisterResponseData extends IDefaultResponseData {
  token: string | null,
}
interface ILoginResponseData extends IDefaultResponseData {
  token: string | null,
}
interface ILogoutUserData extends IDefaultResponseData {}
interface ITasksResponseData extends IDefaultResponseData {
  tasks: ITask_Server[],
}


interface ITaskResponseSynchronizeData {
  success: boolean,
  error: string | null,
  task: ITask_Server | null,
}
interface ITaskResponseUpdateData {
  success: boolean,
  error: string | null;
}


export type {
  IBaseResponse,
  ICheckAuthResponseData,
  IAuthResponseData,
  ILoginResponseData,
  ITasksResponseData,
  IRegisterResponseData,
  ILogoutUserData,
  ITaskResponseSynchronizeData,
  ITaskResponseUpdateData,
};