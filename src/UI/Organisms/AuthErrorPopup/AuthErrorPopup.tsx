import './AuthErrorPopup.scss';
import React from 'react';
import ModalPopup from '../../../components/ModalPopup/ModalPopup';
import { Button } from '../../../components/Button/Button';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchAuth } from '../../../redux/actions';
import { authActions } from '../../../redux/reducers/authReducer/authReducer';

const AuthErrorPopup = () => {
  const dispatch = useAppDispatch();
  const { token, authError } = useAppSelector(state => state.authReducer);
  const onRefresh = () => {
    dispatch(fetchAuth(token as string));
  }
  const onEntry = () => {
    dispatch(authActions.logOut());
  }

  return (
    <ModalPopup contentVerticalAlign='center'>
      <div className='AuthErrorPopup'>
        <div className='AuthErrorPopup__title'>Ошибка авторизации</div>
        <div>
          В данный момент сервер недоступен. Мы уже работаем над решением этой проблемы. Приносим свои извинения.
        </div>
        <div>
          {authError}
        </div>
        <div className='AuthErrorPopup__buttons'>
          <Button onClick={onRefresh}>Повторить попытку</Button>
          <Button onClick={onEntry}>Продолжить без аккаунта</Button>
        </div>
      </div>
    </ModalPopup>
  );
};

export { AuthErrorPopup };