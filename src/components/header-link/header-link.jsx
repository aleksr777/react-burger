import headerLinkStyles from './header-link.module.css';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { memo } from 'react';


const HeaderLink = ({ children, navText, path }) => {

  const setActive = ({ isActive }) => isActive
    ? `${headerLinkStyles.link} ${headerLinkStyles.link_active}`
    : headerLinkStyles.link;

  return (
    <NavLink className={setActive} to={path}>
      {children}
      <p className={headerLinkStyles.text}>{navText}</p>
    </NavLink>
  );
};

export default memo(HeaderLink, (prevProps, nextProps) => {
  /* Отключаем перерендер компонента */
  if (nextProps.children !== prevProps.children
    && nextProps.navText !== prevProps.navText
    && nextProps.path !== prevProps.path) { return false }
  else { return true }
});

HeaderLink.propTypes = {
  children: PropTypes.node.isRequired,
  navText: PropTypes.string,
  path: PropTypes.string
};