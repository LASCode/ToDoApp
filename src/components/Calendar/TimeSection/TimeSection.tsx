import './TimeSection.scss';
import React, { useState } from 'react';
import Slider from 'rc-slider';
import { setHours, setMinutes } from 'date-fns';

interface ITimeSection {
  initialDate: Date,
  onChange: (date: Date) => void
}

const TimeSection = ({ initialDate = new Date(), onChange = ()=>{} }: ITimeSection) => {
  const [localHours, setLocalHours] = useState<number>(initialDate.getHours())
  const [localMinutes, setLocalMinutes] = useState<number>(initialDate.getMinutes())
  return (
    <div className='TimeSection'>
      <div>
        <div className='TimeSection__header'>
          <span className='TimeSection__title'> Часы: </span>
          <span className='TimeSection__count'>{ localHours }</span>
        </div>
        <div className='TimeSection__body'>
          <Slider
            min={0}
            max={23}
            value={localHours}
            onChange={(value) => setLocalHours(value as number)}
            onAfterChange={(value) => onChange(setHours(initialDate, value as number))}
          />
        </div>
      </div>
      <div>
        <div className='TimeSection__header'>
          <span className='TimeSection__title'> Минуты: </span>
          <span className='TimeSection__count'>{ localMinutes }</span>
        </div>
        <div className='TimeSection__body'>
          <Slider
            min={0}
            max={59}
            value={localMinutes}
            onChange={(value) => setLocalMinutes(value as number)}
            onAfterChange={(value) => onChange(setMinutes(initialDate, value as number))}
          />
        </div>
      </div>
    </div>
  );
};

export { TimeSection };
