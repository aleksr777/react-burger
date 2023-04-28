import stylesProfileBlockAbout from './profile-block-about.module.css';
import PropTypes from 'prop-types';


const ProfileBlockAbout = ({ children }) => {

  return (
    <div className={stylesProfileBlockAbout.blockAbout}>{children}</div>
  );
};

export default ProfileBlockAbout;

ProfileBlockAbout.propTypes = {
  children: PropTypes.node.isRequired,
};