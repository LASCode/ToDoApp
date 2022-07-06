import './IsImportantConfirm.scss';
import React from 'react';
import { Button } from '../../../components/Button/Button';


interface IDeadlineProps {
  onConfirm: ()=>void,
  onCancel: ()=>void,
}

const DeadlineConfirm = ({ onConfirm, onCancel}: IDeadlineProps) => {
  return (
    <div className='NewTaskAction'>
      <div className='NewTaskAction__title'>Задаче был назначен дедлайн</div>
      <div className='NewTaskAction__description'>
        - Эта задача автоматически провалится по дстижению указанного срока <br/>
      </div>
      <div className='NewTask__actions'>
        <input type="text" placeholder='Дедлайн'/>
      </div>
      <div className='NewTaskAction__buttons'>
        <Button className='NewTaskAction__button' onClick={onCancel}>Отмена</Button>
        <Button className='NewTaskAction__button' onClick={onConfirm}>Принять</Button>
      </div>
    </div>
  )
};

export default DeadlineConfirm;