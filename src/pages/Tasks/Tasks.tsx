import './Tasks.scss';
import React, { useState } from 'react';
import CrossSvg from '../../assets/img/icon-add.svg';
import AddTaskSection from './AddTaskSection/AddTaskSection';
import { TaskList } from '../../UI/Organisms/TaskList/TaskList';

const Tasks = () => {
  return (
    <div className='TasksPage'>
      <div className='TasksPage__newTask'>
        <AddTaskSection/>
      </div>
      <div className='TasksPage__taskList'>
        <TaskList />
      </div>
    </div>
  );
};

export default Tasks;

