import './AuthActions.scss';
import React from 'react';
import { NavLink } from 'react-router-dom';

const AuthActions = () => {
  return (
    <div className='AuthActionsPage'>
      <div className='AuthActionsPage__container'>
        <div className='AuthActionsPage__card'>
          <NavLink to='/register'>Зарегистрироваться</NavLink>
          <br/>
          <NavLink to='/login'>Войти в аккаунт</NavLink>
        </div>
      </div>
    </div>
  );
};

export { AuthActions };
