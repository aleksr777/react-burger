import appHeaderStyles from './app-header.module.css';
import { memo } from 'react';
import HeaderLink from '../header-link/header-link';
import HeaderLogo from '../header-logo/header-logo';

const AppHeader = () => {

  return (
    <header className={appHeaderStyles.header}>
      <nav className={appHeaderStyles.nav}>
        <div className={appHeaderStyles.nav__box}>
          <HeaderLink icon='burger' text='Конструктор' path='/' />
          <HeaderLink icon='list' text='Лента заказов' path='/feed' />
          <HeaderLogo />
        </div>
        <HeaderLink icon='profile' text='Личный кабинет' path='/profile' />
      </nav>
    </header >
  );
};

export default memo(AppHeader);