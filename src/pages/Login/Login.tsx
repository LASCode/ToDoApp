import React from 'react';
import './Login.scss';
import { Button } from '../../components/Button/Button';
import warningIcon from '../../assets/img/icon-warning.svg'
import { Input } from '../../components/Input/Input';
import { useNavigate, useNavigationType } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { fetchLogin, fetchRegister } from '../../redux/actions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { FormErrorMessage } from '../../components/FormErrorMessage/FormErrorMessage';

interface ILoginFormInputs {
  login: string,
  password: string,
}

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loginIsFetching, loginError } = useAppSelector(state => state.authReducer)
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<ILoginFormInputs>()
  const redirectToRegisterPage = () => {
    navigate('/register')
  }
  const onSubmit: SubmitHandler<ILoginFormInputs> = (data) => {
    dispatch(fetchLogin({login: data.login, password: data.password}));
  };
  const onAutoSelect = () => {
    setValue('login', 'admin');
    setValue('password', 'admin');
  }

  return (
    <div className='LoginPage'>
      <div className='LoginPage__container'>
        <div className='LoginPage__padding-wrapper LoginPage__padding-wrapper--with-form'>
          <h1 className='LoginPage__title'>Вход в аккаунт</h1>
          <form className='LoginPage__form' onSubmit={handleSubmit(onSubmit)}>
            <div className='LoginPage__error-message-container'>
              <FormErrorMessage active={(!!loginError && !loginIsFetching)} text={loginError as string} />
            </div>
            <Input placeholder='Логин' type='text' {...register('login')} />
            <Input placeholder='Пароль' type='password' {...register('password')} />
            <div className='LoginPage__button-container LoginPage__button-container--with-login'>
              <Button type='submit'>Войти</Button>
              <Button icon={warningIcon} onClick={onAutoSelect} />
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
