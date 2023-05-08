import headerLinkStyles from './header-link.module.css';
import { useState, useEffect } from 'react';
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

  const match = useMatch(path);
  const location = useLocation();

  const [isActiveLink, setIsActiveLink] = useState(false);

  useEffect(() => {
    (match || (location.pathname.indexOf(path) !== -1 && path !== '/'))
      ? setIsActiveLink(true)
      : setIsActiveLink(false)
  }, [location.pathname, match]);

  function setIconType() {
    if (isActiveLink) {
      return 'primary';
    }
    return 'secondary';
  }

  function setIconElement() {
    switch (icon) {
      case 'burger':
        return <BurgerIcon type={setIconType(isActiveLink)} />;
      case 'list':
        return <ListIcon type={setIconType(isActiveLink)} />;
      case 'profile':
        return <ProfileIcon type={setIconType(isActiveLink)} />;
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