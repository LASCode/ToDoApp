import './Navigation.scss';
import React from 'react';
import { NavTimer } from '../../Molecules/Nav-Timer/NavTimer';
import { NavLinks } from '../../Molecules/Nav-Links/NavLinks';
import { useAppSelector } from '../../../redux/hooks';
import { NavUserInfoPreloader } from '../../Molecules/Nav-UserInfoPreloader/NavUserInfoPreloader';
import { NavUserInfo } from '../../Molecules/Nav-UserInfo/Nav-UserInfo';
import { defaultUserAvatar } from '../../../fakeBackend/variables';

const Navigation = () => {
  const { authAccess, authIsFetching, userData, authSuccess } = useAppSelector(state => state.authReducer);
  const hasAccess = !authIsFetching && authAccess;
  const isAuth = authSuccess;
  const validUserInfoObj = { avatar: userData?.avatar, username: userData?.username, tokens: userData?.tokens }
  const defaultUserInfoObj = { avatar: defaultUserAvatar, username: 'Unregistered', tokens: 0 };

  return (
    <div className='Navigation'>
      <div> <NavTimer initialDate={new Date()} /> </div>
      <div> <NavLinks /> </div>
      <div>
        { !hasAccess && <NavUserInfoPreloader/> }
        { hasAccess && !isAuth && <NavUserInfo redirect='/authActions' {...defaultUserInfoObj} /> }
        { hasAccess && isAuth && <NavUserInfo redirect='/profile' {...validUserInfoObj} /> }
      </div>
    </div>
  );
};

export { Navigation };
