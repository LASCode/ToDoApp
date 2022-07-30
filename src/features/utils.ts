import { ITask, ITask_Server } from '../types/entity';

interface IToUpperCaseProps {
  str: string,
  from?: number,
  to?: number,
}
const toUpperCase = ({ str = '', from = 0, to = 0 }: IToUpperCaseProps) => {
  return str.slice(from, to).toUpperCase() + str.slice(to-1)
}


const convertToClientTask = (task: ITask_Server): ITask => {
  return ({...task, isSynchronized: true, isFetching: false, error: null, actionFetchingArray: [], checked: false })
}
const convertToServerTask = (task: ITask): ITask_Server => {
  const { id, name, status, unix, description, important, deadline, notification } = task;
  return { id, name, status, unix, description, important, deadline, notification };
}
const convertToClientTasks = (tasks: ITask_Server[]): ITask[] => {
  return tasks.map(el => convertToClientTask(el));
}
const convertToServerTasks = (tasks: ITask[]): ITask_Server[] => {
  return tasks.map(el => convertToServerTask(el))
}

const reverseArray = <T>(array: T[]) => {
  const arrayCopy = [...array];
  arrayCopy.reverse();
  return arrayCopy;
}



export { toUpperCase, convertToClientTasks, convertToClientTask, convertToServerTasks, convertToServerTask, reverseArray }