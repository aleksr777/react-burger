import PropTypes from 'prop-types';
import navLinkStyles from './nav-link.module.css';

const NavLink = ({ children, navText }) => {
  return (
    <a className={navLinkStyles.nav__link} href="#">
      {children}
      <p className={navLinkStyles.nav__text}>{navText}</p>
    </a>
  );
};

NavLink.propTypes = {
  children: PropTypes.node.isRequired,
  navText: PropTypes.string
};

export default NavLink;