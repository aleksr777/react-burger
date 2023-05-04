import stylesProfile from './profile.module.css';
import { useLocation, Outlet } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { requestLogout } from '../../services/authorization/auth-actions';
import ProfileLink from '../../components/profile-link/profile-link';
import ProfileNavBlock from '../../components/profile-nav-block/profile-nav-block';
import ProfileBlockAbout from '../../components/profile-block-about/profile-block-about';
import ProfileTextAbout from '../../components/profile-text-about/profile-text-about';


const ProfilePage = () => {

  const dispatch = useDispatch();
  const location = useLocation();

  let textAbout = '';
  switch (location.pathname) {
    case '/profile':
      textAbout = 'изменить свои персональные данные';
      break;
    case '/profile/orders':
      textAbout = 'просмотреть свою историю заказов';
      break;
    default:
      break;
  }

  return (
    <>
      <div className={stylesProfile.container}>

        <ProfileNavBlock>

          <ProfileLink text='Профиль' path='/profile' />

          <ProfileLink text='История заказов' path='/profile/orders' />

          <button
            /* Сделал простую кнопку для разлогирования (для проверки функционала).
            Потом сделаю, как потребуется, в следующем спринте*/
            onClick={() => dispatch(requestLogout())}
            className={stylesProfile.logoutButton}
          >Выход
          </button>

          <ProfileBlockAbout>
            <ProfileTextAbout>В этом разделе вы можете</ProfileTextAbout>
            <ProfileTextAbout>{textAbout}</ProfileTextAbout>
          </ProfileBlockAbout>

        </ProfileNavBlock>

        <Outlet />

      </div>
    </>
  )
};

export default ProfilePage;