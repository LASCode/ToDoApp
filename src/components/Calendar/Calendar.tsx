import './Calendar.scss';
import React from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { TimeSection } from './TimeSection/TimeSection';

interface ICalendar extends Omit<ReactDatePickerProps, 'onChange'> {
  initialDate?: Date,
  onSelect?: (date: Date) => void;
}


const Calendar = ({ initialDate = new Date(), onSelect = (date)=>{} }: ICalendar) => {
  return (
    <DatePicker
      calendarClassName='Datepicker__picker-body'
      selected={initialDate}
      showPopperArrow={false}
      inline={true}
      onChange={(date: Date) => onSelect(date)}
      locale='ru'
    >
      <TimeSection
        initialDate={initialDate}
        onChange={(date: Date) => onSelect(date)}
      />
    </DatePicker>
  );
};

export { Calendar };