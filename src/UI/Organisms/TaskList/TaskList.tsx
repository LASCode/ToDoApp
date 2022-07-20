import './TaskList.scss';
import React from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { Task } from '../../Molecules/Task/Task';

const TaskList = () => {
  const { tasks, isFetching } = useAppSelector(state => state.taskReducer);
  const {  } = useAppSelector(state => state.authReducer);
  return (
    <div className='TaskList'>
      { tasks.map(el => <Task {...el} key={el.id} />) }
    </div>
  );
};

export { TaskList };
