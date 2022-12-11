import React from 'react';
import stylesOverlay from './modal-overlay.module.css';

const ModalOverlay = (props) => {
  const { onClose } = props;
  return <div onClick={onClose} className={stylesOverlay.overlay} />;
};

export default ModalOverlay;
