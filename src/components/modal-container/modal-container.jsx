import stylesContainer from './modal-container.module.css';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";


const ModalContainer = forwardRef(({ handleCloseModal, children }, ref) => {

  return (
    <div className={stylesContainer.container} ref={ref} >
      <div className={stylesContainer.button}>
        <CloseIcon type="primary" onClick={handleCloseModal} />
      </div>
      {children}
    </div>
  );
});

export default ModalContainer;

ModalContainer.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

