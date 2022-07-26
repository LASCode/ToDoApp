import './TaskPrimaryForm.scss';
import React from 'react';
import { Input } from '../../../components/Input/Input';
import { taskActions } from '../../../redux/reducers/taskReducer/taskReducer';
import CrossSvg from '../../../assets/img/icon-add.svg';
import { CSSTransition } from 'react-transition-group';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getClassnamesFromObject } from '../../../features/get-classnames-from-object';
import { setNewTaskData, setTask } from '../../../redux/actions';
import { useFormContext } from 'react-hook-form';
import { INewTaskTempData } from '../../../types/entity';

interface ITaskPrimaryForm {
  onClose: () => void,
  onOpen: () => void;
}

const TaskPrimaryForm = ({ onClose, onOpen }: ITaskPrimaryForm) => {
  const { register, getValues } = useFormContext<INewTaskTempData>();
  const { isOpen } = getValues();

  const closeButtonClassList = getClassnamesFromObject({
    'TaskPrimaryForm__close-btn': true,
    'enter-done': isOpen,
  });

  return (
    <div className='TaskPrimaryForm'>
      <Input
        className='TaskPrimaryForm__input'
        placeholder='Введите новую задачу...'
        onFocus={onOpen}
        autoComplete='off'
        // value={NTName}
        // // onChange={(event) => dispatch(taskActions.setTaskName(event.target.value))}
        {...register('name')}
      />
      {/*<button className='TaskPrimaryForm__submit-btn' type='button' onClick={onSubmit}>*/}
      <button className='TaskPrimaryForm__submit-btn' type='submit'>
        <img className='TaskPrimaryForm__button-img' src={CrossSvg} alt='Добавить задачу'/>
      </button>
      <CSSTransition in={isOpen} timeout={500}>
        <button className={closeButtonClassList} onClick={onClose} type='button'>
          <img className='TaskPrimaryForm__button-img TaskPrimaryForm__button-img--rotated' src={CrossSvg} alt='Добавить задачу'/>
        </button>
      </CSSTransition>
    </div>
  );
};

export { TaskPrimaryForm };