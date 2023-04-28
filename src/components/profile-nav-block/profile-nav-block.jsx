import stylesProfileNavBlock from './profile-nav-block.module.css';
import PropTypes from 'prop-types';


const ProfileNavBlock = ({ children }) => {

  return (
    <div className={stylesProfileNavBlock.navBlock}>{children}</div>
  );
};

export default ProfileNavBlock;

ProfileNavBlock.propTypes = {
  children: PropTypes.node.isRequired,
};