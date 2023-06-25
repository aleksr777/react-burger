import styles from './logo-link.module.css'
import { useState, useEffect } from 'react'
import { useLocation, useMatch, Link } from 'react-router-dom'
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'


const LogoLink = () => {

  const defaultStyle: string = styles.link
  const activeStyle: string = `${ styles.link } ${ styles.link_active }`

  const match = useMatch( '/' )
  const location = useLocation()

  const [ isActiveLink, setIsActiveLink ] = useState<boolean>( false )

  useEffect( () => {
    match ? setIsActiveLink( true ) : setIsActiveLink( false )
  }, [ location.pathname, match ] )

  return (
    <Link
      className={ isActiveLink ? activeStyle : defaultStyle }
      tabIndex={ isActiveLink ? -1 : undefined }
      to="/"
      draggable={ false }
    >
      <Logo />
    </Link>
  )
}

export default LogoLink