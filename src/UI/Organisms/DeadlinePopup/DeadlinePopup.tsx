import './DeadlinePopup.scss';
import React, { useState } from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import { addDays } from 'date-fns';
import { taskActions } from '../../../redux/reducers/taskReducer/taskReducer';
import ModalPopup from '../../../components/ModalPopup/ModalPopup';
import { Datepicker } from '../../Atoms/Datepicker/Datepicker';
import { Button } from '../../../components/Button/Button';
import { TaskActionBullet } from '../../Atoms/TaskActionBullet/TaskActionBullet';

const DeadlinePopup = () => {
  const dispatch = useAppDispatch();

  const defaultDate = addDays(Date.now(), 2);

  const [ resultDate, setResultDate ] = useState<number>(defaultDate.getTime())

  const confirmDeadline = () => {
    dispatch(taskActions.deadlineIsActiveToggle(true));
    dispatch(taskActions.deadlineSetData([resultDate]));
    dispatch(taskActions.deadlineIsOpenToggle(false));
  }
  const cancelDeadline = () => {
    dispatch(taskActions.deadlineIsActiveToggle(false));
    dispatch(taskActions.deadlineIsOpenToggle(false))
  }

  const bulletList = [
    { text: 'Эта задача автоматически провалится по дстижению указанного срока', num: 1 },
    { text: 'Эта задача автоматически провалится по дстижению указанного срока', num: 2 },
    { text: 'Эта задача автоматически провалится по дстижению указанного срока', num: 3 },
    { text: 'Эта задача автоматически провалится по дстижению указанного срока', num: 4 },
  ]

  return (
    <ModalPopup contentVerticalAlign='auto'>
      <div className='DeadlinePopup'>

        <div className='DeadlinePopup__title'>Задаче был назначен дедлайн</div>

        <div className='DeadlinePopup__description'>
          <div className='DeadlinePopup__description-title'>Дополнительная информация:</div>
          <div className='DeadlinePopup__description-items'>
            { bulletList.map((el, i) => <TaskActionBullet {...el} key={el.num} />) }
          </div>
        </div>

        <div className='DeadlinePopup__actions'>
          <div className='DeadlinePopup__actions-title'>Возможные действия:</div>
          <div className='DeadlinePopup__actions-body'>
            <Datepicker
              initialDate={new Date(Date.now())}
              onChange={(value, name)=>setResultDate(value)}
              name={0}
            />
          </div>
        </div>

        <div className='DeadlinePopup__buttons'>
          <Button className='DeadlinePopup__button' onClick={cancelDeadline}>Отмена</Button>
          <Button className='DeadlinePopup__button' onClick={confirmDeadline}>Принять</Button>
        </div>

      </div>
    </ModalPopup>
  )
};

export { DeadlinePopup };