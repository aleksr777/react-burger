import React from 'react';
import headerStyles from './app-header.module.css';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

const NavLink = props => {
  return (    
    <a className={headerStyles.nav__link} href="#">
      {props.children}
      <p className={headerStyles.nav__text}>{props.navText}</p>
    </a>
  );
};

export default class AppHeader extends React.Component {
  render() {
    return (
      <header className={headerStyles.header}>
        <nav className={headerStyles.nav}>
          <div className={headerStyles.nav__box}>
            <NavLink navText="Конструктор"><BurgerIcon type="primary" /></NavLink>
            <NavLink navText="Лента заказов"><ListIcon type="primary" /></NavLink>
            <Logo />
          </div>
          <NavLink navText="Личный кабинет"><ProfileIcon type="primary" /></NavLink>
        </nav>
      </header>
    );
  }
}