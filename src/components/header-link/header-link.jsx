import headerLinkStyles from './header-link.module.css';
import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import { unauthRoutesPaths } from '../../constants/constants';


const HeaderLink = ({ children, navText, path }) => {

  const location = useLocation();

  function isUnauthRoute(locationPath) {
    let isUnauth = false;
    unauthRoutesPaths.map((routePath) => {
      if (locationPath === routePath) { isUnauth = true }
    });
    return isUnauth;
  }

  function setActive() {
    if (isUnauthRoute(location.pathname)) {
      return (path === '/')
        ? headerLinkStyles.link
        : `${headerLinkStyles.link} ${headerLinkStyles.link_disable}`;
    }
    else {
      return (location.pathname.indexOf(path) !== -1)
        ? `${headerLinkStyles.link} ${headerLinkStyles.link_active}`
        : headerLinkStyles.link;
    }
  }

  return (
    <NavLink className={setActive} to={path} draggable='false'>
      {children}
      <p className={headerLinkStyles.text}>{navText}</p>
    </NavLink>
  );
};

export default HeaderLink;

HeaderLink.propTypes = {
  children: PropTypes.node.isRequired,
  navText: PropTypes.string,
  path: PropTypes.string
};