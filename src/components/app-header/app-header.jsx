import PropTypes from 'prop-types';
import headerStyles from './app-header.module.css';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

const NavLink = ({children, navText}) => {
  return (
    <a className={headerStyles.nav__link} href="#">
      {children}
      <p className={headerStyles.nav__text}>{navText}</p>
    </a>
  );
};

NavLink.propTypes = {
  navText: PropTypes.string
};

export const AppHeader = () => {
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
};