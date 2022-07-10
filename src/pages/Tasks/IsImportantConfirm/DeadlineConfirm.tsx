import './IsImportantConfirm.scss';
import React, { useState } from 'react';
import ModalPopup from '../../../components/ModalPopup/ModalPopup';
import { Button } from '../../../components/Button/Button';
import calendarSvg from '../../../assets/img/icon-calendar.svg';
import { useForm, Validate, ValidateResult } from 'react-hook-form';
import { ru } from 'date-fns/locale';
import { addDays, format, parse } from 'date-fns';
import moment from 'moment';
import 'moment/locale/ru'
moment.locale('ru', {
  months: ['Январь', 'Январь','Январь','Январь','Январь','Январь','Январь','Январь','Январь','Январь','Январь','Январь']
})




interface IDeadlineProps {
  onConfirm?: ()=>void,
  onCancel?: ()=>void,
}

const DeadlineConfirm = ({ onConfirm, onCancel}: IDeadlineProps) => {
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
          </div>
        </div>
        <div className='testbox__actions'>
          <div className='testbox__actions-title'>Возможные действия:</div>
          <TimeInput/>
        </div>
      </div>
    </ModalPopup>
    // <div className='NewTaskAction'>
    //   <div className='NewTaskAction__title'>Задаче был назначен дедлайн</div>
    //   <div className='NewTaskAction__description'>
    //     - Эта задача автоматически провалится по дстижению указанного срока <br/>
    //   </div>
    //   <div className='NewTask__actions'>
    //     <input type="text" placeholder='Дедлайн'/>
    //   </div>
    //   <div className='NewTaskAction__buttons'>
    //     <Button className='NewTaskAction__button' onClick={onCancel}>Отмена</Button>
    //     <Button className='NewTaskAction__button' onClick={onConfirm}>Принять</Button>
    //   </div>
    // </div>
  )
};

export default DeadlineConfirm;


interface ITimeData {
  day: { value: string, error: boolean, success: boolean },
  month: { value: string, error: boolean, success: boolean },
  year: { value: string, error: boolean, success: boolean },
  time: { value: string, error: boolean, success: boolean },
  unix: number,
  success: boolean,
}
const TimeInput = () => {
  const defaultDate = addDays(Date.now(), 2);

  // const [monthData, setMonthData] = useState<IMonthData>({
  //   value: 'Июля',
  //   error: false,
  //   success: true,
  // })
  // const [dayData, setDayData] = useState<IMonthData>({
  //   value: '12',
  //   error: false,
  //   success: true,
  // })
  // const [yearData, setYearData] = useState<IMonthData>({
  //   value: '2022',
  //   error: false,
  //   success: true,
  // })
  // const [timeData, setTimeData] = useState<IMonthData>({
  //   value: '12:00',
  //   error: false,
  //   success: true,
  // })
  const [timeData, setTimeData] = useState<ITimeData>({
    day: { value: format(defaultDate, 'dd'), error: false, success: false },
    month: { value: format(defaultDate, 'MMMM', {locale: ru}), error: false, success: false },
    year: { value: format(defaultDate, 'YYY'), error: false, success: false },
    time: { value: format(defaultDate, 'HH:mm'), error: false, success: false },
    unix: defaultDate.getTime(),
    success: false,
  })



  const monthChange = (e: React.FormEvent<HTMLInputElement>) => {
    // const months = 'Января_Февраля_Марта_Апреля_Мая_Июня_Июля_Августа_Сентября_Октября_Ноября_Декабря'.split('_')
    // const value = e.currentTarget.value.toLowerCase()
    // // const isValidMonth = months.includes()
    // if (months.some(el => el.search(e.currentTarget.value) !== -1)) {
    //   setMonthData({ ...monthData, value: value, error: false });
    // } else {
    //   setMonthData({ ...monthData, error: true, success: false });
    // }
  }

  const handler = (e: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget: { name, value } } = e;
    const { day, time, year, month } = timeData;
    const valueLC = e.currentTarget.value.toLowerCase();

    if (name === 'month') {
      const monthsArrayDefault = 'Января_Февраля_Марта_Апреля_Мая_Июня_Июля_Августа_Сентября_Октября_Ноября_Декабря'.split('_');
      const monthsArrayLover = monthsArrayDefault.map(el=>el.toLowerCase());
      const monthIndex = monthsArrayLover.indexOf(valueLC);
      const isValidMonth = monthsArrayLover.includes(valueLC);
      const partialWordIsFound = monthsArrayLover.some(el => el.search(valueLC) !== -1)



      if (partialWordIsFound) {
        setTimeData({ ...timeData, month: { ...timeData.day, value: value, error: false } });
      } else
      if (isValidMonth) {
        setTimeData({ ...timeData, month: { ...timeData.day, value: monthsArrayDefault[monthIndex], error: false, success: true } });
      } else {
        setTimeData({ ...timeData, month: { ...timeData.day, value: value, error: true, success: false } });
      }
        console.log(value)

    }


    // console.log(timeData, defaultDate)
  }
  return (
    <div className='testInput'>
      <div className='testInput__inputs'>
        <input className='testInput__input' name='day' value={timeData.day.value} onChange={handler}/>
        <input className='testInput__input' name='month' value={timeData.month.value} onInput={handler}/>
        <input className='testInput__input' name='year' value={timeData.year.value} onChange={handler}/>
        <input className='testInput__input' name='time' value={timeData.time.value} onChange={handler}/>
      </div>
      <div className='testInput__calendar'>
        <img src={calendarSvg} />
      </div>
    </div>
  )
}