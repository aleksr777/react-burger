import ReactDOM from 'react-dom'
import { useState, useEffect } from 'react'

type Props = {
  children: React.ReactNode
}

const ModalPortal = ( { children }: Props ) => {

  const [ modalElement ] = useState<HTMLDivElement>( () => document.createElement( 'div' ) )

  useEffect( () => {
    document.body.appendChild( modalElement )
    return () => {
      document.body.removeChild( modalElement )
    }
  }, [ modalElement ] )

  return ReactDOM.createPortal( children, modalElement )
}

export default ModalPortal
