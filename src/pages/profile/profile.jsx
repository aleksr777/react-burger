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

  const pathProfile = '/profile';
  const pathOrders = '/profile/orders';

  let textAbout = '';

  switch (location.pathname) {
    case pathProfile:
      textAbout = 'изменить свои персональные данные';
      break;
    case pathOrders:
      textAbout = 'просмотреть свою историю заказов';
      break;
    default:
      break;
  }

  return (

    <div className={stylesProfile.container}>

      <ProfileNavBlock>

        <ProfileLink text='Профиль' path={pathProfile} />

        <ProfileLink text='История заказов' path={pathOrders} />

        <button
          /* Сделал простой сценарий для кнопки разлогирования.
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
  )
};

export default ProfilePage;