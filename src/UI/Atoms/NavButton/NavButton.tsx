import './NavButton.scss';
import React from 'react';
import { NavLink } from 'react-router-dom';

interface INavButton {
  icon: string,
  title: string,
  href: string,
}
const NavButton = ({ icon, title, href }: INavButton) => {
  return (
    <NavLink to={href} className='NavButton'>
      <img src={icon} alt="navigation-icon" className={'NavButton__img'}/>
      <span className='NavButton__title'>{title}</span>
    </NavLink>
  );
};

export { NavButton };