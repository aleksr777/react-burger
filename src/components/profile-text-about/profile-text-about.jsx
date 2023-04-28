import stylesProfileTextAbout from './profile-text-about.module.css';
import PropTypes from 'prop-types';
import { memo } from 'react';


const ProfileTextAbout = ({ children }) => {

  return (
    <p className={stylesProfileTextAbout.textAbout}>{children}</p>
  );
};

export default memo(ProfileTextAbout);

ProfileTextAbout.propTypes = {
  children: PropTypes.string.isRequired,
};