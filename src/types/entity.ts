interface IServerUser {
  id: number,
  login: string,
  password: string,
  token: string,
  username: string,
  avatar: string,
  tasks: ITask[],
}
interface IServerUserShort {
  id: number,
  login: string,
  token: string,
  username: string,
  avatar: string,
}
interface ITask {
  id: number,
  title: string,
  description: string,
  options: {
    deadline: number | false,
    important: boolean,
    notification: number[] | false,
  },
  type: 'active' | 'archive' | 'deleted' | 'failed'
}
interface IServerDataBase {
  users: IServerUser[],
}

interface IReduxAuthData {
  id: number,
  login: string,
  username: string,
  avatar: string,
}


export type { ITask, IServerUser, IServerUserShort, IServerDataBase, IReduxAuthData };