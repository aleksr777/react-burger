import styles from './profile.module.css'
import { useLocation, Outlet } from "react-router-dom"
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { requestLogout } from '../../services/authorization/auth-actions'
import ProfileLink from '../../components/profile-link/profile-link'


const ProfilePage = () => {

  const dispatch = useAppDispatch()
  const location = useLocation()

  const pathProfile = '/profile'
  const pathOrders = '/profile/orders'

  let textAbout = ''

  switch ( location.pathname ) {
    case pathProfile:
      textAbout = 'изменить свои персональные данные'
      break
    case pathOrders:
      textAbout = 'просмотреть свою историю заказов'
      break
    default:
      break
  }

  return (

    <div className={ styles.container }>

      <div className={ styles.navBlock }>

        <ProfileLink text='Профиль' path={ pathProfile } />

        <ProfileLink text='История заказов' path={ pathOrders } />

        <button
          /* Сделал простой сценарий для кнопки разлогирования.
          Потом сделаю, как потребуется, в следующем спринте*/
          onClick={ () => dispatch( requestLogout() ) }
          className={ styles.logoutButton }
        >Выход
        </button>

        <div className={ styles.blockAbout }>
          <p className={ styles.textAbout }>В этом разделе вы можете</p>
          <p className={ styles.textAbout }>{ textAbout }</p>
        </div>

      </div>

      <Outlet />

    </div>
  )
}

export default ProfilePage