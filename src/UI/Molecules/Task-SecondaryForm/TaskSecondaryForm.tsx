import './TaskSecondaryForm.scss';
import React from 'react';
import { Textarea } from '../../../components/Textarea/Textarea';
import { taskActions } from '../../../redux/reducers/taskReducer/taskReducer';
import { Checkbox } from '../../../components/Checkbox/Checkbox';
import { getClassnamesFromObject } from '../../../features/get-classnames-from-object';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { CSSTransition } from 'react-transition-group';
import { useFormContext } from 'react-hook-form';
import { INewTaskTempData } from '../../../types/entity';

const TaskSecondaryForm = () => {
  const dispatch = useAppDispatch();
  const { register, getValues, setValue } = useFormContext<INewTaskTempData>();
  const { isOpen, deadline } = getValues();
  const { NTDeadline } = useAppSelector(state => state.taskReducer)

  const hiddenFormClassList = getClassnamesFromObject({
    'TaskSecondaryForm': true,
    'enter-done': isOpen,
  });

  return (
    <CSSTransition in={isOpen} timeout={500}>
      <div className={hiddenFormClassList}>
        <Textarea
          className={'TaskSecondaryForm__textarea'}
          placeholder={'Дополнительно о задаче (необязательно)'}
          {...register('description')}
        />
        <div className='TaskSecondaryForm__taskActions'>
          <button className='TaskSecondaryForm__taskAction' type='button' onClick={() => setValue('deadline.isOpen', true)}>
            <span>Хочу дедлайн!</span>
            <Checkbox checked={deadline.isActive} readOnly />
          </button>
          <button className='TaskSecondaryForm__taskAction' type='button' onClick={() => setValue('important.isOpen', true)}>
            <span>Хочу дедлайн!</span>
            {/*<Checkbox checked={NTDeadline.isActive} readOnly />*/}
          </button>
          <button className='TaskSecondaryForm__taskAction' type='button' onClick={() => setValue('notification.isOpen', true)}>
            <span>Хочу дедлайн!</span>
            {/*<Checkbox checked={NTDeadline.isActive} readOnly />*/}
          </button>
        </div>
      </div>
    </CSSTransition>
  );
};

export { TaskSecondaryForm };