import './TaskAdd.scss';
import React, { MouseEventHandler, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { taskActions } from '../../../redux/reducers/taskReducer/taskReducer';
import { getClassnamesFromObject } from '../../../features/get-classnames-from-object';
import { Input } from '../../../components/Input/Input';
import CrossSvg from '../../../assets/img/icon-add.svg';
import { CSSTransition } from 'react-transition-group';
import { Textarea } from '../../../components/Textarea/Textarea';
import { Checkbox } from '../../../components/Checkbox/Checkbox';
import { TaskPrimaryForm } from '../../Molecules/Task-PrimaryForm/TaskPrimaryForm';
import { TaskSecondaryForm } from '../../Molecules/Task-SecondaryForm/TaskSecondaryForm';
import { setTask } from '../../../redux/actions';

const TaskAdd = () => {

  return (
    <div className='TaskAdd'>
      <TaskPrimaryForm />
      <TaskSecondaryForm />
    </div>
  )
};

export { TaskAdd };