import headerLinkStyles from './header-link.module.css';
import PropTypes from 'prop-types';
import { NavLink, useLocation, useMatch } from 'react-router-dom';
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

  function checkIsMatch(locationPath, path) {
    if (match || (locationPath.indexOf(path) !== -1 && path !== '/')) {
      return true
    }
    return false
  }

  function checkActive(isMatchLinks) {
    if (isMatchLinks) {
      return true;
    }
    return false;
  };

  function setIconType(isMatchLinks) {
    if (isMatchLinks) {
      return 'primary';
    }
    return 'secondary';
  }

  const isMatchLinks = checkIsMatch(location.pathname, path);  
  const isActiveLink = checkActive(isMatchLinks);
  const iconType = setIconType(isMatchLinks);

  function setIconElement(icon) {
    switch (icon) {
      case 'burger':
        return <BurgerIcon type={iconType} />;
      case 'list':
        return <ListIcon type={iconType} />;
      case 'profile':
        return <ProfileIcon type={iconType} />;
      default: return null;
    }
  };

  return (
    <NavLink
      className={isActiveLink ? activeStyle : defaultStyle}
      tabIndex={isActiveLink ? '-1' : ''}
      to={path}
      draggable='false'
    >
      {setIconElement(icon)}
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