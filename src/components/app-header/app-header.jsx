import appHeaderStyles from './app-header.module.css';
import HeaderLink from '../header-link/header-link';
import HeaderLogo from '../header-logo/header-logo';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
  return (
    <header className={appHeaderStyles.header}>
      <nav className={appHeaderStyles.nav}>
        <div className={appHeaderStyles.nav__box}>
          <HeaderLink navText='Конструктор' path='/'><BurgerIcon type='primary' /></HeaderLink>
          <HeaderLink navText='Лента заказов' path='/'><ListIcon type='primary' /></HeaderLink>
          <HeaderLogo />
        </div>
        <HeaderLink navText='Личный кабинет' path='/login'><ProfileIcon type='primary' /></HeaderLink>
      </nav>
    </header >
  );
};

export default AppHeader;