import stylesProfileLink from './profile-link.module.css';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { memo } from 'react';


const ProfileLink = ({ navText, path }) => {

  const setActive = ({ isActive }) => isActive
    ? `${stylesProfileLink.link} ${stylesProfileLink.link_active}`
    : stylesProfileLink.link;

  return (
    <NavLink className={setActive} to={path} draggable='false'>
      <p className={stylesProfileLink.text}>{navText}</p>
    </NavLink>
  );
};

export default memo(ProfileLink);

ProfileLink.propTypes = {
  navText: PropTypes.string,
  path: PropTypes.string
};