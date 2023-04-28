import stylesProfileTextAbout from './profile-text-about.module.css';
import PropTypes from 'prop-types';


const ProfileTextAbout = ({ children }) => {

  return (
    <p className={stylesProfileTextAbout.textAbout}>{children}</p>
  );
};

export default ProfileTextAbout;

ProfileTextAbout.propTypes = {
  children: PropTypes.string.isRequired,
};