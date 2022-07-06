import './IsImportantConfirm.scss';
import React from 'react';
import { Button } from '../../../components/Button/Button';


interface IIsImportantProps {
  onConfirm: ()=>void,
  onCancel: ()=>void,
}

const IsImportantConfirm = ({ onConfirm, onCancel}: IIsImportantProps) => {
  return (
    <div className='NewTaskAction'>
      <div className='NewTaskAction__title'>Задача была помечена как важная!</div>
      <div className='NewTaskAction__description'>
        - Теперь задача будет отображаться в самом верху списка <br/>
        - За выполнение важных задач вы будете получать в два раза больше токенов <br/>
        - За провал важной задачи с вашего аккаунта будет списано 1.5х цены задачи в токенах.
      </div>
      <div className='NewTaskAction__buttons'>
        <Button className='NewTaskAction__button' onClick={onCancel}>Отмена</Button>
        <Button className='NewTaskAction__button' onClick={onConfirm}>Принять</Button>
      </div>
    </div>
  )
};

export default IsImportantConfirm;