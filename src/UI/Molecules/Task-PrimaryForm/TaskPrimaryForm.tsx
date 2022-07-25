import './TaskPrimaryForm.scss';
import React from 'react';
import { Input } from '../../../components/Input/Input';
import { taskActions } from '../../../redux/reducers/taskReducer/taskReducer';
import CrossSvg from '../../../assets/img/icon-add.svg';
import { CSSTransition } from 'react-transition-group';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getClassnamesFromObject } from '../../../features/get-classnames-from-object';
import { setTask } from '../../../redux/actions';

const TaskPrimaryForm = () => {
  const dispatch = useAppDispatch();
  const { NTIsOpen, NTName } = useAppSelector(state => state.taskReducer)

  const onOpen = () => {
    dispatch(taskActions.isOpenToggle(true))
  }
  const onClose = () => {
    dispatch(taskActions.isOpenToggle(false))
  }
  const onSubmit = () => {
    dispatch(setTask())
    // dispatch(taskActions.createNewTask());
    dispatch(taskActions.clearNTForm());
    dispatch(taskActions.isOpenToggle(false));
  }

  const closeButtonClassList = getClassnamesFromObject({
    'TaskPrimaryForm__close-btn': true,
    'enter-done': NTIsOpen,
  });


  return (
    <div className='TaskPrimaryForm'>
      <Input
        className='TaskPrimaryForm__input'
        placeholder='Введите новую задачу...'
        onFocus={onOpen}
        autoComplete='off'
        value={NTName}
        onChange={(event) => dispatch(taskActions.setTaskName(event.target.value))}
      />
      <button className='TaskPrimaryForm__submit-btn' type='button' onClick={onSubmit}>
        <img className='TaskPrimaryForm__button-img' src={CrossSvg} alt='Добавить задачу'/>
      </button>
      <CSSTransition in={NTIsOpen} timeout={500}>
        <button className={closeButtonClassList} onClick={onClose} type='button'>
          <img className='TaskPrimaryForm__button-img TaskPrimaryForm__button-img--rotated' src={CrossSvg} alt='Добавить задачу'/>
        </button>
      </CSSTransition>
    </div>
  );
};

export { TaskPrimaryForm };