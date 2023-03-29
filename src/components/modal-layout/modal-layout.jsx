import stylesLayout from './modal-layout.module.css';
import PropTypes from 'prop-types';
import { MODAL_ANIMATION_TIME } from '../../constants/constants';
import { useState, useEffect, useRef } from 'react';
import ModalOverlay from '../modal-overlay/modal-overlay';
import ModalContainer from '../modal-container/modal-container';
import { CSSTransition } from 'react-transition-group';


const overlayAnimation = {
  enterActive: stylesLayout.overlayEnterActive,
  exitActive: stylesLayout.overlayExitActive,
};

const containerAnimation = {
  enterActive: stylesLayout.containerEnterActive,
  exitActive: stylesLayout.containerExitActive,
};

const ModalLayout = ({ children, handleCloseModal, isModalOpened }) => {

  const overlayRef = useRef();
  const containerRef = useRef();

  const [animationIn, setAnimationIn] = useState(false);

  function startAnimation() {
    setAnimationIn(isModalOpened);
  }

  useEffect(() => startAnimation(), [isModalOpened]);

  return (
    <>

      <CSSTransition
        in={animationIn}
        nodeRef={overlayRef}
        timeout={MODAL_ANIMATION_TIME}
        mountOnEnter
        unmountOnExit
        classNames={overlayAnimation}
      >
        <ModalOverlay handleCloseModal={handleCloseModal} ref={overlayRef} />
      </CSSTransition>

      <CSSTransition
        in={animationIn}
        nodeRef={containerRef}
        timeout={MODAL_ANIMATION_TIME}
        mountOnEnter
        unmountOnExit
        classNames={containerAnimation}
      >
        <ModalContainer handleCloseModal={handleCloseModal} ref={containerRef}>
          {children}
        </ModalContainer>
      </CSSTransition>
    </>
  );
};

ModalLayout.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  isModalOpened: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

export default ModalLayout;
