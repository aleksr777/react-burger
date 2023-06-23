import React, { useState, useEffect } from 'react'
import ModalPortal from '../modal-portal/modal-portal'
import ModalLayout from '../modal-layout/modal-layout'
import { MODAL_ANIMATION_TIME } from '../../constants/constants'

type Props = {
  handleCloseModal: () => void
  isModalOpened: boolean
  children: React.ReactNode
}


const Modal = ( { handleCloseModal, isModalOpened, children }: Props ) => {

  const [ isModalMounted, setModalMounted ] = useState<boolean>( false )

  useEffect( () => {
    if ( isModalOpened && !isModalMounted ) {
      setModalMounted( true )
    } else if ( !isModalOpened && isModalMounted ) {
      setTimeout( () => {
        setModalMounted( false )
      }, MODAL_ANIMATION_TIME )
    }
  }, [ isModalOpened ] )

  useEffect( () => {
    const handleEsc = ( e: KeyboardEvent ) => {
      if ( e.key === 'Escape' || e.key === 'Esc' ) {
        handleCloseModal()
      }
    }

    document.addEventListener( 'keydown', handleEsc )
    return () => {
      document.removeEventListener( 'keydown', handleEsc )
    }
  }, [ handleCloseModal ] )

  if ( !children || !isModalMounted ) {
    return null
  }

  return (
    <ModalPortal>
      <ModalLayout handleCloseModal={ handleCloseModal } isModalOpened={ isModalOpened }>
        { children }
      </ModalLayout>
    </ModalPortal>
  )
}

export default Modal
