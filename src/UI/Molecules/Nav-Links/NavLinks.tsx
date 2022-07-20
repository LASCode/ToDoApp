import './NavLinks.scss';
import React from 'react';
import homeImg from '../../../assets/img/icon-home.svg';
import statsImg from '../../../assets/img/icon-stats.svg';
import timerImg from '../../../assets/img/icon-timer.svg';
import folderImg from '../../../assets/img/icon-folder.svg';
import usersImg from '../../../assets/img/icon-users.svg';
import mailImg from '../../../assets/img/icon-mail.svg';
import { NavButton } from '../../Atoms/NavButton/NavButton';

const NavLinks = () => {
  const navRoutesArray = [
    {title: 'Задачи', href: '/', icon: homeImg},
    {title: 'Статистика', href: '/stats', icon: statsImg},
    {title: 'Дедлайны', href: '/deadlines', icon: timerImg},
    {title: 'Архив', href: '/archive', icon: folderImg},
    {title: 'Пользователи', href: '/users', icon: usersImg},
    {title: 'Мессенджер', href: '/messenger', icon: mailImg},
  ];

  return (
    <div className='NavLinks'>
      {
        navRoutesArray.map(el => <NavButton {...el} key={el.href}/> )
      }
    </div>
  );
};

export { NavLinks };
