import './Button.scss';
import React from 'react';
import { getClassnamesFromObject } from '../../features/get-classnames-from-object';
import { ReactComponent as DotsSvg } from '../../assets/img/icon-3dots.svg'

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  children?: React.ReactNode,
  icon?: false | string | undefined,
  type?: 'submit' | 'reset' | 'button' | undefined,
  adaptive?: boolean,
  loading?: boolean,
  disabled?: boolean,
}

const Button = ({icon, children, type = 'button', adaptive = true, loading = false, disabled = false, ...otherParams}: IButton) => {
  const classNames = getClassnamesFromObject({
    'Button' : true,
    'Button--with-icon': icon,
    'Button--without-text': !children,
    'Button--with-adaptive': adaptive,
  });
  return (
    <button className={classNames} type={type} {...otherParams} disabled={disabled}>
      { icon && <img className='Button__icon' src={icon} alt='Button Icon'/> }
      { (children && !loading) && <span className='Button__text'>{children}</span> }
      { loading && <DotsSvg className='Button__loading'/>}
    </button>
  );
};

export { Button };
