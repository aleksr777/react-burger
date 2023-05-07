import stylesProfileLink from './profile-link.module.css';
import PropTypes from 'prop-types';
import { NavLink, useMatch } from 'react-router-dom';
import { memo } from 'react';


const ProfileLink = ({ text, path }) => {

  const defaultStyle = stylesProfileLink.link;
  const activeStyle = `${stylesProfileLink.link} ${stylesProfileLink.link_active}`;

  const match = useMatch(path);  

  function checkIsMatch() {
    if (match) {
      return true
    }
    return false
  };

  return (
    <NavLink
      className={checkIsMatch() ? activeStyle : defaultStyle}
      tabIndex={checkIsMatch() ? '-1' : ''}
      to={path}
      draggable='false'
    >
      <p className={stylesProfileLink.text}>{text}</p>
    </NavLink>
  );
};

export default memo(ProfileLink);

ProfileLink.propTypes = {
  navText: PropTypes.string,
  path: PropTypes.string
};