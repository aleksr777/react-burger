import headerLinkStyles from './header-link.module.css';
import PropTypes from 'prop-types';
import { NavLink, useLocation, useMatch } from 'react-router-dom';
import { unauthRoutesPaths } from '../../constants/constants';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';


const HeaderLink = ({ icon, text, path }) => {

  const defaultStyle = headerLinkStyles.link;
  const activeStyle = `${headerLinkStyles.link} ${headerLinkStyles.link_active}`;

  const location = useLocation();

  const match = useMatch(path);

  function checkIsMatch() {
    if (match) {
      return true
    }
    return false
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

  function checkActive() {
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
      className={checkActive() ? activeStyle : defaultStyle}
      tabIndex={checkActive() ? '-1' : ''}
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