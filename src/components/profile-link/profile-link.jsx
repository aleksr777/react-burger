import stylesProfileLink from './profile-link.module.css';
import PropTypes from 'prop-types';
import { NavLink, useMatch } from 'react-router-dom';
import { memo } from 'react';


const ProfileLink = ({ text, path }) => {

  const defaultStyle = stylesProfileLink.link;
  const activeStyle = `${stylesProfileLink.link} ${stylesProfileLink.link_active}`;

  const match = useMatch(path);

  return (
    <NavLink
      className={match ? activeStyle : defaultStyle}
      tabIndex={match ? '-1' : ''}
      to={path}
      draggable='false'
    >
      <p className={stylesProfileLink.text}>{text}</p>
    </NavLink>
  );
};

export default memo(ProfileLink);

ProfileLink.propTypes = {
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
};