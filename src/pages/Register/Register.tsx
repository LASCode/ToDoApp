import React, { forwardRef, useEffect, useState } from 'react';
import './Register.scss';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { useNavigate } from 'react-router-dom';
import { FieldErrors, RegisterOptions, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchRegister } from '../../redux/actions';
import { CSSTransition } from 'react-transition-group';
import { FormErrorMessage } from '../../components/FormErrorMessage/FormErrorMessage';

interface IRegisterInputs {
  login: string,
  username: string,
  password: string,
}

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<IRegisterInputs>()
  const { registerIsFetching, registerError } = useAppSelector(state => state.authReducer)
  const dispatch = useAppDispatch();
  const redirectToLoginPage = () => {
    navigate('/login');
  }
  const redirectToProfilePage = () => {
    navigate('/profile');
  }
  const inputOptions: {[key: string]: RegisterOptions} = {
    login: {
      required: {value: true, message: 'Это поле не может быть пустым'},
      minLength: {value: 6, message: 'Логин слишком короткий (<6)'},
      maxLength: {value: 20, message: 'Логин слишком длинный (<20)'},
    },
    username: {
      required: {value: true, message: 'Это поле не может быть пустым'},
      maxLength: {value: 20, message: 'Имя пользователя слишком длинное (<20)'},
    },
    password: {
      required: {value: true, message: 'Это поле не может быть пустым'},
      minLength: {value: 4, message: 'Пароль слишком короткий (<4)'},
    }
  }
  const onSubmit: SubmitHandler<IRegisterInputs> = (data) => {
    dispatch(fetchRegister({login: data.login, username: data.username, password: data.password}))
  };

  return (
    <div className='RegistrationPage'>
      <div className='RegistrationPage__container'>
        <div className='RegistrationPage__padding-wrapper RegistrationPage__padding-wrapper--with-form'>
          <h1 className='RegistrationPage__title'>Регистрация аккаунта</h1>
          <form className='RegistrationPage__form' onSubmit={handleSubmit(onSubmit)}>
            <div className='RegistrationPage__error-message-container'>
              <FormErrorMessage active={(!!registerError && !registerIsFetching)} text={registerError as string} />
            </div>
            <Input
              placeholder='Логин'
              type='text'
              {...register('login', {...inputOptions.login})}
              error={!!errors.login}
              errorMessage={errors.login?.message}
              disabled={registerIsFetching}
            />
            <Input
              placeholder='Имя пользователя'
              type='text'
              {...register('username', {...inputOptions.username})}
              error={!!errors.username}
              errorMessage={errors.username?.message}
              disabled={registerIsFetching}
            />
            <Input
              placeholder='Пароль'
              type='password'
              {...register('password', {...inputOptions.password})}
              error={!!errors.password}
              errorMessage={errors.password?.message}
              disabled={registerIsFetching}
            />
            <div className='RegistrationPage__register-button-container'>
              <Button
                type='submit'
                loading={registerIsFetching}
                disabled={registerIsFetching}
              >Зарегистрироваться</Button>
            </div>
          </form>
        </div>
        <div className='RegistrationPage__br'>
          <span className='RegistrationPage__br-text'>Уже есть аккаунт?</span>
        </div>
        <div className='RegistrationPage__padding-wrapper RegistrationPage__padding-wrapper--with-login-btn'>
          <Button onClick={redirectToLoginPage}>Войти</Button>
        </div>
      </div>
    </div>
  );
};

export { Register };
