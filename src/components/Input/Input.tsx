import './Input.scss';
import React, { ForwardedRef, HTMLInputTypeAttribute, useState } from 'react';
import { getClassnamesFromObject } from '../../features/get-classnames-from-object';
import imgAlert from '../../assets/img/icon-alert.svg';
import { CSSTransition } from 'react-transition-group';

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  adaptive?: boolean,
  error?: boolean,
  errorMessage?: string,
}

const Input = React.forwardRef(({ adaptive = true, error = false, errorMessage = 'хуй', ...anotherInputParams }: IInput, ref: ForwardedRef<any>) => {
  const classNames = getClassnamesFromObject({
    'Input__textarea' : true,
    'Input__textarea--with-adaptive' : adaptive,
    'Input__textarea--with-error' : error,
  });
  const [openErrorMessage, setOpenErrorMessage] = useState(true);
  const onClick = () => {
    setOpenErrorMessage(!openErrorMessage);
  }

  return (
    <div className='Input'>
        <div className='Input__flex-container'>
        <input className={classNames} {...anotherInputParams} ref={ref}/>

        { error &&
          <span className='Input__error-btn' title='Показать ошибку' onClick={onClick}>
            <img src={imgAlert} alt=""/>
          </span>
        }
      </div>
      <CSSTransition in={!openErrorMessage} timeout={500} unmountOnExit classNames='Input__error-box'>
        <div className='Input__error-box'>
          <span className='Input__error-text'>
            {errorMessage}
          </span>
        </div>
      </CSSTransition>
    </div>
  );
});

export { Input };