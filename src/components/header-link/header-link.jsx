import headerLinkStyles from './header-link.module.css';
import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import { unauthRoutesPaths } from '../../constants/constants';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';


const HeaderLink = ({ icon, text, path }) => {

  const location = useLocation();

  const defaultStyle = headerLinkStyles.link;
  const activeStyle = `${headerLinkStyles.link} ${headerLinkStyles.link_active}`;

  function checkIsMatch() {
    /* Пробовал проверять через хук useMatch, но возвращается почему-то всегда 'null'.
    Решил сделать пока так. */
    if (location.pathname === '/' && path === '/') {
      return true
    }
    else if (location.pathname === '/' && path !== '/' || location.pathname !== '/' && path === '/') {
      return false
    }
    else {
      return location.pathname.indexOf(path) !== -1 ? true : false
    }
  }

  /* Функция нужна, чтобы сделать ссылки неактивными на некоторых роутах */
  function checkIsUnauthRoute() {
    let isUnauth = false;
    unauthRoutesPaths.map((routePath) => {
      if (location.pathname === routePath) { isUnauth = true }
    });
    return isUnauth;
  }

  const isUnauth = checkIsUnauthRoute();
  const IsMatch = checkIsMatch();

  function checkActiv() {
    if (IsMatch && !isUnauth) {
      return true;
    }
    else if (!IsMatch && isUnauth && path !== '/') {
      return true; /* блокируем ссылку */
    }
    else {
      return false;
    }
  };

  function setIconType() {
    if (IsMatch) {
      return 'primary';
    }
    return 'secondary';
  }

  function setIconElement() {
    switch (icon) {
      case 'burger':
        return <BurgerIcon type={setIconType()} />;
      case 'list':
        return <ListIcon type={setIconType()} />;
      case 'profile':
        return <ProfileIcon type={setIconType()} />;
      default: return null;
    }
  };

  return (
    <NavLink
      className={checkActiv() ? activeStyle : defaultStyle}
      tabIndex={checkActiv() ? '-1' : ''}
      to={path}
      draggable='false'
    >
      {setIconElement()}
      <p className={headerLinkStyles.text}>{text}</p>
    </NavLink>
  );
};

export default HeaderLink;

HeaderLink.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  path: PropTypes.string
};