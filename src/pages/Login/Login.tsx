import React from 'react';
import './Login.scss';
import { Button } from '../../components/Button/Button';
import warningIcon from '../../assets/img/icon-warning.svg'
import { Input } from '../../components/Input/Input';
import { useNavigate, useNavigationType } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const redirectToRegisterPage = () => {
    navigate('/register')
  }

  return (
    <div className='LoginPage'>
      <div className='LoginPage__container'>
        <div className='LoginPage__padding-wrapper LoginPage__padding-wrapper--with-form'>
          <h1 className='LoginPage__title'>Вход в аккаунт</h1>
          <form className='LoginPage__form'>
            <Input placeholder='Логин' type='text' />
            <Input placeholder='Пароль' type='password' />
            <div className='LoginPage__button-container LoginPage__button-container--with-login'>
              <Button>Войти</Button>
              <Button icon={warningIcon} />
            </div>
          </form>
        </div>
        <div className='LoginPage__br'>
          <span className='LoginPage__br-text'>Еще нет аккаунта?</span>
        </div>
        <div className='LoginPage__padding-wrapper LoginPage__padding-wrapper--with-register-btn'>
          <Button onClick={redirectToRegisterPage}>Зарегистрироваться</Button>
        </div>
      </div>
    </div>
  );
};

export { Login };
