import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { ITask } from '../types/entity';
import { useState } from 'react';
import { LSVariables } from '../vriables/variables';
import { fetchTasks } from '../redux/actions';
import { taskActions } from '../redux/reducers/taskReducer/taskReducer';
import { useLocalStorage } from './useLocalStorage';

const useTasks = () => {
  const { authAccess, authSuccess } = useAppSelector(state => state.authReducer);
  const serverTasks = useAppSelector(state => state.taskReducer.tasks);




  return { taskList: [], setTask: ()=>{}, synchronize: ()=>{} }
}
export { useTasks };