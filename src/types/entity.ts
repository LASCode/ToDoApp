interface IServerUser {
  id: number,
  login: string,
  password: string,
  authToken: string,
  username: string,
  avatar: string,
  tokens: number,
  tasks: ITask_Server[],
}

interface IServerUserShort {
  id: number,
  login: string,
  authToken: string,
  username: string,
  avatar: string,
  tokens: number,
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

interface INewTaskTempData {
  name: string,
  description: string,
  isOpen: boolean,
  deadline: { isActive: boolean, isOpen: boolean, value: number[] },
  important: { isActive: boolean, isOpen: boolean, value: number[] },
  notification: { isActive: boolean, isOpen: boolean, value: number[] },
}

interface INewTaskTempData_short {
  name: string,
  description: string,
  isOpen: boolean,
  deadline: { isActive: boolean, value: number[] },
  important: { isActive: boolean, value: number[] },
  notification: { isActive: boolean, value: number[] },
}


type TaskActionValue = (null | number);
type TaskStatusValue = 'Active' | 'Archive' | 'Deleted' | 'Failed';
interface ITask {
  id: number,
  name: string,
  description: string,
  deadline: { isActive: boolean, value: TaskActionValue[] },
  important: { isActive: boolean, value: TaskActionValue[] },
  notification: { isActive: boolean, value: TaskActionValue[] },
  status: TaskStatusValue,
  unix: number,
  isSynchronized: boolean,
  isFetching: boolean,
  error: string | null,
}
interface ITask_Short {
  name: string,
  description: string,
  deadline: { isActive: boolean, value: TaskActionValue[] },
  important: { isActive: boolean, value: TaskActionValue[] },
  notification: { isActive: boolean, value: TaskActionValue[] },
}
interface ITask_Server {
  id: number,
  status: TaskStatusValue,
  unix: number,
  name: string,
  description: string,
  deadline: { isActive: boolean, value: TaskActionValue[] },
  important: { isActive: boolean, value: TaskActionValue[] },
  notification: { isActive: boolean, value: TaskActionValue[] },
}
interface ITask_FromData {
  name: string,
  description: string,
  isOpen: boolean,
  deadline: { isActive: boolean, value: TaskActionValue[] },
  important: { isActive: boolean, value: TaskActionValue[] },
  notification: { isActive: boolean, value: TaskActionValue[] },
}


interface INewTask {
  name: string,
  description: string,
  isOpen: boolean,
  deadline: { isActive: boolean, value: (null | number)[] },
  important: { isActive: boolean, value: (null | number)[] },
  notification: { isActive: boolean, value: (null | number)[] },
}

interface INewTask_Storage {
  name: string,
  description: string,
  isOpen: boolean,
  deadline: { isActive: boolean, value: (null | number)[] },
  important: { isActive: boolean, value: (null | number)[] },
  notification: { isActive: boolean, value: (null | number)[] },
}


export type {
  IServerUser,
  IServerUserShort,
  IServerDataBase,
  IReduxAuthData,
  INewTaskTempData,
  INewTaskTempData_short,
  INewTask,
  INewTask_Storage,

  ITask,
  ITask_Server,
  ITask_FromData,
  ITask_Short,
};