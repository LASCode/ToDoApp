import './TaskActionBullet.scss';
import React from 'react';

interface ITaskActionBullet {
  num: number,
  text: string,
}

const TaskActionBullet = ({num, text}: ITaskActionBullet) => {
  return (
    <div className='TaskActionBullet'>
      <div className='TaskActionBullet__number'>{num}</div>
      <div className='TaskActionBullet__text'>{text}</div>
    </div>
  );
};

export { TaskActionBullet };