import './TaskSecondaryForm.scss';
import React from 'react';
import { Textarea } from '../../../components/Textarea/Textarea';
import { taskActions } from '../../../redux/reducers/taskReducer/taskReducer';
import { Checkbox } from '../../../components/Checkbox/Checkbox';
import { getClassnamesFromObject } from '../../../features/get-classnames-from-object';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { CSSTransition } from 'react-transition-group';

const TaskSecondaryForm = () => {
  const dispatch = useAppDispatch();
  const { NTIsOpen, NTDesc, NTDeadline } = useAppSelector(state => state.taskReducer)

  const hiddenFormClassList = getClassnamesFromObject({
    'TaskSecondaryForm': true,
    'enter-done': NTIsOpen,
  });

  return (
    <CSSTransition in={NTIsOpen} timeout={500}>
      <div className={hiddenFormClassList}>
        <Textarea
          className={'TaskSecondaryForm__textarea'}
          placeholder={'Дополнительно о задаче (необязательно)'}
          value={NTDesc}
          onChange={(event) => dispatch(taskActions.setTaskDescription(event.target.value))}
        />
        <div className='TaskSecondaryForm__taskActions'>
          <button className='TaskSecondaryForm__taskAction' type='button' onClick={() => dispatch(taskActions.deadlineIsOpenToggle(true))}>
            <span>Хочу дедлайн!</span>
            <Checkbox checked={NTDeadline.isActive} readOnly />
          </button>
          <button className='TaskSecondaryForm__taskAction' type='button' onClick={() => dispatch(taskActions.deadlineIsOpenToggle(true))}>
            <span>Хочу дедлайн!</span>
            <Checkbox checked={NTDeadline.isActive} readOnly />
          </button>
          <button className='TaskSecondaryForm__taskAction' type='button' onClick={() => dispatch(taskActions.deadlineIsOpenToggle(true))}>
            <span>Хочу дедлайн!</span>
            <Checkbox checked={NTDeadline.isActive} readOnly />
          </button>
        </div>
      </div>
    </CSSTransition>
  );
};

export { TaskSecondaryForm };