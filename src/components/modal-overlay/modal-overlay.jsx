import stylesOverlay from './modal-overlay.module.css';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';

const ModalOverlay = forwardRef(({ handleCloseModal }, ref) => {
  return (
    <div onClick={handleCloseModal} className={stylesOverlay.overlay} ref={ref} />
  );
});

ModalOverlay.propTypes = {
  handleCloseModal: PropTypes.func.isRequired
};

export default ModalOverlay;
