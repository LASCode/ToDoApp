import './NavTimer.scss';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useInterval } from '../../../hooks/useInterval';

interface INavTimer {
  initialDate: Date,
}
const NavTimer = ({ initialDate }: INavTimer) => {
  const [ date, setDate ] = useState<Date>(initialDate);
  const updateDate = () => setDate(new Date())
  useInterval(updateDate, 1000);

  return (
    <div className='NavTimer'>
      <span> {format(date, 'kk : mm : ss', {locale: ru})} </span>
      <span> {format(date, 'dd MMMM uuuu', {locale: ru})} </span>
    </div>
  );
};

export { NavTimer };
