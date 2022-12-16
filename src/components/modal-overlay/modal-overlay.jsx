import PropTypes from 'prop-types';
import stylesOverlay from './modal-overlay.module.css';

const ModalOverlay = ({ handleCloseModal }) => {
  return <div onClick={handleCloseModal} className={stylesOverlay.overlay} />;
};

ModalOverlay.propTypes = {
  handleCloseModal: PropTypes.func.isRequired
};

export default ModalOverlay;
