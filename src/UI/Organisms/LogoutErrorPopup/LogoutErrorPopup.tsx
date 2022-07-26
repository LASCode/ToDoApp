import './LogoutErrorPopup.scss';
import React from 'react';
import ModalPopup from '../../../components/ModalPopup/ModalPopup';
import { Button } from '../../../components/Button/Button';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchAuth, fetchLogout } from '../../../redux/actions';
import { authActions } from '../../../redux/reducers/authReducer/authReducer';

const LogoutErrorPopup = () => {
  const dispatch = useAppDispatch();
  const { logoutError, logoutIsFetching } = useAppSelector(state => state.authReducer);
  const onRefresh = () => {
    dispatch(fetchLogout());
  }
  const onEntry = () => {
    dispatch(authActions.resetLogout());
  }

  return (
    <ModalPopup contentVerticalAlign='center'>
      <div className='AuthErrorPopup'>
        <div className='AuthErrorPopup__title'>Ошибка авторизации</div>
        <div>
          В данный момент сервер недоступен. Мы уже работаем над решением этой проблемы. Приносим свои извинения.
        </div>
        <div>
          {logoutError}
        </div>
        <div className='AuthErrorPopup__buttons'>
          <Button onClick={onRefresh}>Повторить попытку</Button>
          <Button onClick={onEntry}>Попробоать позже</Button>
        </div>
      </div>
    </ModalPopup>
  );
};

export { LogoutErrorPopup };