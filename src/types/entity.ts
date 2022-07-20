interface IServerUser {
  id: number,
  login: string,
  password: string,
  authToken: string,
  username: string,
  avatar: string,
  tokens: number,
  tasks: ITask[],
}
interface IServerUserShort {
  id: number,
  login: string,
  authToken: string,
  username: string,
  avatar: string,
  tokens: number,
}
interface ITask {
  isSynchronized: boolean,
  isFetching: boolean,
  id: number,
  name: string,
  description: string,
  deadline: { isActive: boolean, value: number[] },
  important: { isActive: boolean, value: number[] },
  notifications: { isActive: boolean, value: number[] },
  status: 'Active' | 'Archive' | 'Deleted' | 'Failed',
  unix: number,
}
interface IServerDataBase {
  users: IServerUser[],
}

interface IReduxAuthData {
  id: number,
  login: string,
  username: string,
  avatar: string,
  tokens: number,
}


export type { ITask, IServerUser, IServerUserShort, IServerDataBase, IReduxAuthData };