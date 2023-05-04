import stylesProfileLink from './profile-link.module.css';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { memo } from 'react';
import { useLocation } from "react-router-dom";


const ProfileLink = ({ text, path }) => {

  const { pathname } = useLocation();

  function setActive() {
    return (pathname === path)
      ? `${stylesProfileLink.link} ${stylesProfileLink.link_active}`
      : stylesProfileLink.link;
  }

  return (
    <NavLink className={setActive} to={path} draggable='false'>
      <p className={stylesProfileLink.text}>{text}</p>
    </NavLink>
  );
};

export default memo(ProfileLink);

ProfileLink.propTypes = {
  navText: PropTypes.string,
  path: PropTypes.string
};