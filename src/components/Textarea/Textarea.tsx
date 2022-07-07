import React, { ForwardedRef, useState } from 'react';
import { getClassnamesFromObject } from '../../features/get-classnames-from-object';
import { CSSTransition } from 'react-transition-group';
import { ReactComponent as AlertSvg } from '../../assets/img/icon-alert.svg';
import TextareaAutosize from 'react-textarea-autosize';
import { TextareaAutosizeProps } from 'react-textarea-autosize/dist/declarations/src';

interface IInput extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  adaptive?: boolean,
  error?: boolean,
  errorMessage?: string,
  className?: string
}

const Textarea = React.forwardRef(({ adaptive = true, error = false, errorMessage = '', className, ...anotherTextareaParams }: IInput, ref: ForwardedRef<any>) => {
  const classNames = getClassnamesFromObject({
    'Input__textarea' : true,
    'Input__textarea--with-adaptive' : adaptive,
    'Input__textarea--with-error' : error,
  }) + `${className ? ` ${className}` : ''}`;
  const [openErrorMessage, setOpenErrorMessage] = useState(true);
  const onClick = () => {
    setOpenErrorMessage(!openErrorMessage);
  }

  return (
    <div className='Input'>
      <div className='Input__flex-container'>
        <textarea className={classNames} {...anotherTextareaParams} ref={ref}/>

        { error &&
        <span className='Input__error-btn' title='Показать ошибку' onClick={onClick}>
          <CSSTransition in={!openErrorMessage} timeout={500} classNames={'Input__error-svg'}>
            <AlertSvg className='Input__error-svg'/>
          </CSSTransition>
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

export { Textarea };