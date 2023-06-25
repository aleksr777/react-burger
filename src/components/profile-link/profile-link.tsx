import styles from './profile-link.module.css'
import { NavLink, useMatch } from 'react-router-dom'
import { memo } from 'react'

type Props = {
  text: string
  path: string
}


const ProfileLink = ( { text, path }: Props ) => {

  const defaultStyle: string = styles.link
  const activeStyle: string = `${ styles.link } ${ styles.link_active }`

  const match = useMatch( path )

  return (
    <NavLink
      className={ match ? activeStyle : defaultStyle }
      tabIndex={ match ? -1 : 0 }
      to={ path }
      draggable='false'
    >
      { text }
    </NavLink>
  )
}

export default memo( ProfileLink )