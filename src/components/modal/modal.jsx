import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ModalPortal from '../modal-portal/modal-portal';
import ModalLayout from '../modal-layout/modal-layout';
import { bodySelector } from '../../constants/constants';
import { MODAL_ANIMATION_TIME } from '../../constants/constants';


const Modal = ({ handleCloseModal, isModalOpened, children }) => {

  /* Стейт isModalMounted нужен, чтобы анимация успела сработать до закрытия окна */
  const [isModalMounted, setModalMounted] = useState(false);

  useEffect(() => {
    if (isModalOpened && !isModalMounted) {
      setModalMounted(true);
    }
    else if (!isModalOpened && isModalMounted) {
      setTimeout(() => {
        setModalMounted(false);
      }, MODAL_ANIMATION_TIME);
    }
  }, [isModalOpened]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        handleCloseModal();
      }
    }
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };

  }, [handleCloseModal]);

  if (!isModalMounted) {
    return null
  }

  return (
    <ModalPortal>
      <ModalLayout handleCloseModal={handleCloseModal} isModalOpened={isModalOpened}>
        {children}
      </ModalLayout>
    </ModalPortal>
  );
};

Modal.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  isModalOpened: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

export default Modal; 