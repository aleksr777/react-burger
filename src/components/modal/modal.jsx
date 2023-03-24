import { useEffect } from 'react';
import modalStyles from './modal.module.css';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay/modal-overlay'
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";

const modalRootElement = document.getElementById('react-modals');

const Modal = ({ handleCloseModal, isModalOpened, children }) => {

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

  /* прерываем код, если isModalOpened или children не определены */
  if (!isModalOpened || !children) {
    return null
  }

  return ReactDOM.createPortal(
    <div>
      <ModalOverlay handleCloseModal={handleCloseModal} />
      <div className={modalStyles.modal}>
        <div className={modalStyles.button} >
          <CloseIcon type="primary" onClick={handleCloseModal} />
        </div>
        {children}
      </div>
    </div>,
    modalRootElement
  );
};

/* Modal.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}; */

export default Modal; 