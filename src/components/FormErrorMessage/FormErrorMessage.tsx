import './FormErrorMessage.scss';
import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import warningSvg from '../../assets/img/icon-warning.svg';
import removeSvg from '../../assets/img/icon-remove.svg';

interface IFormErrorMessage {
  active: boolean,
  text: string,
  timeout?: number,
  callback?: ()=>void,
}
const FormErrorMessage = ({ text = '', active = true, timeout = 500 }: IFormErrorMessage) => {
  return (
    <CSSTransition
      in={active}
      timeout={timeout}
      classNames='FormErrorMessage'
      unmountOnExit
    >
      <div className='FormErrorMessage'>
        <img src={warningSvg} alt='Ошибка' className='FormErrorMessage__warning-icon'/>
        <span className='FormErrorMessage__text'>{text}</span>
      </div>
    </CSSTransition>
  );
};

export { FormErrorMessage };