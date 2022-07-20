import './Task.scss';
import React from 'react';
import checkmarkSvg from '../../../assets/img/icon-checkmark.svg';
import removeSvg from '../../../assets/img/remove-plus-icon.svg';
import dotsSvg from '../../../assets/img/icon-3dots(normal).svg';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { ITask } from '../../../types/entity';

const Task = ({ unix ,description, name, id, status  }: ITask) => {
  const tas = {
    id: 0,
    title1: 'fwa',
    description1: 'daweaw12 4124 1',
    status: 'active',
    isFetching: true,
    isSynchronized: false,
    deadline: {isActive: false, value: []},
    notifications: {isActive: false, value: []},
    important: {isActive: false, value: []},
    time1: new Date(),
  }
  const { title1, description1, time1 } = tas;

  return (
    <div className='Task'>
      <div className='Task__actions'>
        <div className='Task__checkbox' />
        <div className='Task__status'>{status}</div>
        <div className='Task__action-br' />
        <div className='Task__otherAction'>1</div>
        <div className='Task__date'>{ format(new Date(unix), 'kk:mm:ss dd.MM.uu', {locale: ru}) }</div>
      </div>
      <div className='Task__body'>
        <div className='Task__header'>
          <div className='Task__name'># {name} #</div>
          <div className='Task__header-br' />
          <div className='Task__buttons'>
            <div className="Task__button"><img src={checkmarkSvg} alt=""/></div>
            <div className="Task__button"><img src={removeSvg} alt=""/></div>
            <div className="Task__button"><img src={dotsSvg} alt=""/></div>
          </div>
        </div>
        {description &&
          <div className='Task__description'> {description} </div>
        }
      </div>
    </div>
  );
};

export { Task };
