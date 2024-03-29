import styles from './modal-layout.module.css'
import {
  blockUserInteraction,
  unblockUserInteraction,
} from '../../services/block-user-interaction-service/block-user-interaction-service'
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons"
import { MODAL_ANIMATION_TIME } from '../../constants/constants'
import { CSSTransition } from 'react-transition-group'
import { useState, useEffect, useRef } from 'react'

const overlayAnimation = {
  enterActive: styles.overlayEnterActive,
  exitActive: styles.overlayExitActive,
}

const containerAnimation = {
  enterActive: styles.containerEnterActive,
  exitActive: styles.containerExitActive,
}

type Props = {
  children: React.ReactNode
  handleCloseModal: () => void
  isModalOpened: boolean
}


const ModalLayout = ( { children, handleCloseModal, isModalOpened }: Props ) => {

  const overlayRef = useRef<HTMLDivElement>( null )
  const containerRef = useRef<HTMLDivElement>( null )

  const [ animationIn, setAnimationIn ] = useState( false )

  function startAnimation () {
    setAnimationIn( isModalOpened )
    /* на время срабатывания анимации отключаем взаимодействие с пользователем */
    blockUserInteraction()
    setTimeout( () => {
      unblockUserInteraction()
    }, MODAL_ANIMATION_TIME )
  }

  useEffect( () => {
    startAnimation()
  }, [ isModalOpened ] )

  return (
    <>
      <CSSTransition
        in={ animationIn }
        nodeRef={ overlayRef }
        timeout={ MODAL_ANIMATION_TIME }
        mountOnEnter
        unmountOnExit
        classNames={ overlayAnimation }
      >
        <div
          onClick={ handleCloseModal }
          className={ styles.overlay }
          ref={ overlayRef }
        />
      </CSSTransition>

      <CSSTransition
        in={ animationIn }
        nodeRef={ containerRef }
        timeout={ MODAL_ANIMATION_TIME }
        mountOnEnter
        unmountOnExit
        classNames={ containerAnimation }
      >
        <div className={ styles.container } ref={ containerRef }>
          <div className={ styles.button }>
            <CloseIcon type="primary" onClick={ handleCloseModal } />
          </div>
          { children }
        </div>
      </CSSTransition>
    </>
  )
}

export default ModalLayout
