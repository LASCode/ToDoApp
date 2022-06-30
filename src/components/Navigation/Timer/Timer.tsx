import './Timer.scss'
import React from 'react';
import Moment from 'react-moment';

const Timer = () => {
  return (
    <div className='Navigation-timer'>
      <Moment fromNow format={'hh : mm : ss'} locale={'ru'} interval={1000} />
      <Moment fromNow format={'DD MMMM YYYY'} locale={'ru'} interval={1000}/>
    </div>
  );
};

export default Timer;