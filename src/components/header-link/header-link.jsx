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

  function checkIsMatch(locationPath, path) {
    /* Пробовал проверять через хук useMatch, но возвращается почему-то всегда "null".
    Решил сделать пока так. */
    if (locationPath === '/' && path === '/') {
      return true
    }
    else if (locationPath === '/' && path !== '/' || locationPath !== '/' && path === '/') {
      return false
    }
    else {
      return locationPath.indexOf(path) !== -1 ? true : false
    }
  }

  /* Функция нужна, чтобы сделать ссылки неактивными на некоторых роутах */
  function checkIsUnauthRoute(locationPath) {
    let isUnauth = false;
    unauthRoutesPaths.map((routePath) => {
      if (locationPath === routePath) { isUnauth = true }
    });
    return isUnauth;
  }

  const isUnauth = checkIsUnauthRoute(location.pathname);
  const IsMatch = checkIsMatch(location.pathname, path);

  function setActivity() {
    if (IsMatch && !isUnauth) {
      return activeStyle;
    }
    else if (!IsMatch && isUnauth && path!=='/'){
      return activeStyle; /* блокируем ссылку */
    }
    else {
      return defaultStyle;
    }
  }

  function setIconType(locationPath, path) {
    if (checkIsMatch(locationPath, path)) {
      return 'primary';
    }
    return 'secondary';
  }

  function setIconElement() {
    switch (icon) {
      case 'burger':
        return <BurgerIcon type={setIconType(location.pathname, path)} />;
      case 'list':
        return <ListIcon type={setIconType(location.pathname, path)} />;
      case 'profile':
        return <ProfileIcon type={setIconType(location.pathname, path)} />;
      default: return null;
    }
  };

  return (
    <NavLink className={setActivity()} to={path} draggable='false'>
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