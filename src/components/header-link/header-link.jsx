import headerLinkStyles from './header-link.module.css';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const HeaderLink = ({ children, navText, path }) => {
  return (
    <NavLink className={headerLinkStyles.link} to={path}>
      {children}
      <p className={headerLinkStyles.text}>{navText}</p>
    </NavLink>
  );
};

HeaderLink.propTypes = {
  children: PropTypes.node.isRequired,
  navText: PropTypes.string
};

export default HeaderLink;