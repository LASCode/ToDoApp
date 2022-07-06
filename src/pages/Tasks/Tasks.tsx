import './Tasks.scss';
import React, { useState } from 'react';
import CrossSvg from '../../assets/img/icon-add.svg';
import AddTaskSection from './AddTaskSection/AddTaskSection';
import AutoHeight from '../../components/AutoHeight/AutoHeight';

const Tasks = () => {
  return (
    <div className='TasksPage'>
      <div className='TasksPage__newTask'>
        <AddTaskSection/>
      </div>
      <div className='TasksPage__taskList'>

      </div>
    </div>
  );
};

export default Tasks;

