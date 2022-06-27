import { ITask, IServerUserShort } from './entity';

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
  error: string | false,
  userData: IServerUserShort,
}
interface ITasksResponseData {
  success: boolean,
  error: string | false,
  tasks: ITask[],
}


export type { IBaseResponse, IAuthResponseData, ILoginResponseData, ITasksResponseData, IRegisterResponseData };