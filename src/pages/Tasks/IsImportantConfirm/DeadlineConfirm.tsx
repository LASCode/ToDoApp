import './IsImportantConfirm.scss';
import React, { useState } from 'react';
import ModalPopup from '../../../components/ModalPopup/ModalPopup';
import { ru } from 'date-fns/locale';
import moment from 'moment';
import 'moment/locale/ru'
import { Datepicker } from '../../../components/Datepicker/Datepicker';
import { Button } from '../../../components/Button/Button';
import { addDays } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { taskActions } from '../../../redux/reducers/taskReducer/taskReducer';
moment.locale('ru', {
  months: ['Январь', 'Январь','Январь','Январь','Январь','Январь','Январь','Январь','Январь','Январь','Январь','Январь']
})




interface IDeadlineProps {}

const DeadlineConfirm = ({}: IDeadlineProps) => {
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

  return (
    <ModalPopup contentVerticalAlign='auto'>
      <div className='testbox'>
        <div className='testbox__title'>Задаче был назначен дедлайн</div>
        <div className='testbox__description'>
          <div className='testbox__description-title'>Дополнительная информация:</div>
          <div className='testbox__description-items'>
            <div className='action-description'>
              <div className='action-description__number'>
                1.
              </div>
              <div className='action-description__text'>
                Эта задача автоматически провалится по дстижению указанного срока
              </div>
            </div>
            <div className='action-description'>
              <div className='action-description__number'>
                1.
              </div>
              <div className='action-description__text'>
                Эта задача автоматически провалится по дстижению указанного срока
              </div>
            </div>
            <div className='action-description'>
              <div className='action-description__number'>
                1.
              </div>
              <div className='action-description__text'>
                Эта задача автоматически провалится по дстижению указанного срока
              </div>
            </div>
            <div className='action-description'>
              <div className='action-description__number'>
                1.
              </div>
              <div className='action-description__text'>
                Эта задача автоматически провалится по дстижению указанного срока
              </div>
            </div>
          </div>
        </div>
        <div className='testbox__actions'>
          <div className='testbox__actions-title'>Возможные действия:</div>
          <div className='testbox__actions-body'>
            <Datepicker
              initialDate={new Date(Date.now())}
              onChange={(value, name)=>setResultDate(value)}
              name={0}
            />
          </div>
        </div>
        <div className='NewTaskAction__buttons'>
          <Button className='NewTaskAction__button' onClick={cancelDeadline}>Отмена</Button>
          <Button className='NewTaskAction__button' onClick={confirmDeadline}>Принять</Button>
        </div>
      </div>
    </ModalPopup>
  )
};

export default DeadlineConfirm;