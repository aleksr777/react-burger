import appHeaderStyles from './app-header.module.css';
import NavLink from '../nav-link/nav-link';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
  return (
    <header className={appHeaderStyles.header}>
      <nav className={appHeaderStyles.nav}>
        <div className={appHeaderStyles.nav__box}>
          <NavLink navText="Конструктор"><BurgerIcon type="primary" /></NavLink>
          <NavLink navText="Лента заказов"><ListIcon type="primary" /></NavLink>
          <Logo />
        </div>
        <NavLink navText="Личный кабинет"><ProfileIcon type="primary" /></NavLink>
      </nav>
    </header>
  );
};

export default AppHeader;