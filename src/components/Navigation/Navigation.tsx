import './Navigation.scss';
import React from 'react';
import homeImg from '../../assets/img/icon-home.svg';
import statsImg from '../../assets/img/icon-stats.svg';
import timerImg from '../../assets/img/icon-timer.svg';
import folderImg from '../../assets/img/icon-folder.svg';
import usersImg from '../../assets/img/icon-users.svg';
import mailImg from '../../assets/img/icon-mail.svg';
import { NavButton } from './NavButton/NavButton';
import Timer from './Timer/Timer';
import UserInfo from './UserInfo/UserInfo';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const routesArray = [
    {title: 'Задачи', href: '/', img: homeImg},
    {title: 'Статистика', href: '/stats', img: statsImg},
    {title: 'Дедлайны', href: '/deadlines', img: timerImg},
    {title: 'Архив', href: '/archive', img: folderImg},
    {title: 'Пользователи', href: '/users', img: usersImg},
    {title: 'Мессенджер', href: '/messenger', img: mailImg},
  ];
  return (
    <div className='Navigation'>
      <div className={'Navigation__timer'}> <Timer /> </div>
      <div className='Navigation__links'>
        { routesArray.map(el => <NavButton href={el.href} title={el.title} icon={el.img} key={el.href}/>) }
      </div>
      <NavLink to={'/profile'} className={'Navigation__account'}> <UserInfo /> </NavLink>
    </div>
  );
};

export default Navigation;