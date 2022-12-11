import React, { useEffect, useMemo } from 'react';
import modalStyles from './modal.module.css';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay'
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";

export const modalRootElement = document.querySelector('#react-modals');

const Modal = (props) => {

  const { visible, onClose } = props;

  const element = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    if (visible) {
      modalRootElement.appendChild(element);
      return () => {
        modalRootElement.removeChild(element);
      };
    }
  }, []);


  if (visible) {
    return ReactDOM.createPortal(
      <div>

        <ModalOverlay onClose={onClose} />

        <div className={modalStyles.modal}>
          <button type='button' className={modalStyles.button}>
            <CloseIcon type="primary" onClick={onClose} />
          </button>
          {props.children}
        </div>

      </div>,
      modalRootElement
    );
  }
  return null;
};


export default Modal; 