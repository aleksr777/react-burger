import stylesAppLayout from './app-layout.module.css';
import { Outlet } from 'react-router-dom';
import HeaderLink from '../header-link/header-link';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

const AppLayout = () => {
  return (
    <div className={stylesAppLayout.wrapper}>
      <header className={stylesAppLayout.header}>
        <nav className={stylesAppLayout.nav}>
          <div className={stylesAppLayout.nav__box}>
            <HeaderLink icon='burger' text='Конструктор' path='/' />
            <HeaderLink icon='list' text='Лента заказов' path='/feed' />
            <Logo />
          </div>
          <HeaderLink icon='profile' text='Личный кабинет' path='/profile' />
        </nav>
      </header >
      <main className={stylesAppLayout.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;