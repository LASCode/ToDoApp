import './Datepicker.scss';
import React, { useState } from 'react';
import { DateInput } from '../../../components/Datepicker/DateInput/DateInput';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import calendarSvg from '../../../assets/img/icon-calendar.svg';
import { Calendar } from '../../../components/Calendar/Calendar';

interface IDatePicker {
  initialDate: Date,
  onChange: (value: number) => void,
}

const Datepicker = ({ initialDate, onChange}: IDatePicker) => {
  const [time, setTime] = useState<Date>(initialDate);
  const [open, setOpen] = useState<boolean>(false);
  const onSelect = (date: Date) => {
    setTime(date);
    onChange(time.getTime())
  }

  return (
    <div className='Datepicker'>
      <div className='Datepicker__inputs'>
        <DateInput name='day' value={format(time, 'dd')} onChange={()=>{}} />
        <DateInput name='month' value={format(time, 'MMMM', {locale: ru})} onChange={()=>{}} />
        <DateInput name='year' value={format(time, 'YYY')} onChange={()=>{}} />
        <DateInput name='time' value={format(time, 'HH:mm')} onChange={()=>{}} />
        {/*<DateInput name='day' {...timeData.day} onChange={handler} />*/}
        {/*<DateInput name='month' {...timeData.month} onChange={handler} />*/}
        {/*<DateInput name='year' {...timeData.year} onChange={handler} />*/}
        {/*<DateInput name='time' {...timeData.time} onChange={handler} />*/}
      </div>
      <div className='Datepicker__calendar' onClick={()=>{setOpen(!open)}}>
        <img src={calendarSvg} alt='Показать календарь' />
      </div>
      { open &&
      <div className='Datepicker__picker-container'>
        <Calendar onSelect={onSelect} initialDate={time} />
      </div>
      }
    </div>
  );
};

export { Datepicker };