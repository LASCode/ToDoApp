import './Nav-UserInfo.scss';
import React from 'react';
import { NavLink } from 'react-router-dom';

interface INavUserInfo {
  redirect: string,
  tokens?: number,
  avatar?: string,
  username?: string,
}
const NavUserInfo = ({ redirect, avatar, tokens, username }: INavUserInfo) => {
  return (
    <NavLink className='NavUserInfo' to={redirect}>
      <img className='NavUserInfo__avatar' src={avatar} alt='userAvatar'/>
      <div className='NavUserInfo__userdata'>
        <span className='NavUserInfo__username'>{username}</span>
        <span className='NavUserInfo__tokens'>Tokens: {tokens}</span>
      </div>
    </NavLink>
  );
};

export { NavUserInfo };
