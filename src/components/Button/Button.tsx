import './Button.scss';
import React from 'react';
import { getClassnamesFromObject } from '../../features/get-classnames-from-object';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  children?: React.ReactNode,
  icon?: false | string | undefined,
  type?: 'submit' | 'reset' | 'button' | undefined,
  adaptive?: boolean,
}

const Button = ({icon, children, type = 'button', adaptive = true, ...otherParams}: IButton) => {
  const classNames = getClassnamesFromObject({
    'Button' : true,
    'Button--with-icon': icon,
    'Button--without-text': !children,
    'Button--with-adaptive': adaptive,
  });
  return (
    <button className={classNames} type={type} {...otherParams}>
      { icon && <img className='Button__icon' src={icon} alt='Button Icon'/> }
      { children && <span className='Button__text'>{children}</span> }
    </button>
  );
};

export { Button };
