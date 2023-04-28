import stylesOrders from './orders.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { requestLogout } from '../../services/authorization/auth-actions';
import ProfileLink from '../../components/profile-link/profile-link';
import ProfileNavBlock from '../../components/profile-nav-block/profile-nav-block';
import ProfileBlockAbout from '../../components/profile-block-about/profile-block-about';
import ProfileTextAbout from '../../components/profile-text-about/profile-text-about';
import AppPage from '../../components/app-page/app-page';
import AppHeader from '../../components/app-header/app-header';
import AppMainBlock from '../../components/app-main/app-main';

const getAuthState = state => state.authorization;


const OrdersPage = () => {

  const { refreshToken } = useSelector(getAuthState);

  const dispatch = useDispatch();

  return (

    <AppPage>

      <AppHeader />

      <AppMainBlock>

        <div className={stylesOrders.container}>

          <ProfileNavBlock>

            <ProfileLink navText='Профиль' path='/profile' />

            <ProfileLink navText='История заказов' path='/orders' />

            <button
              /* Сделал простую кнопку для разлогирования (для проверки функционала).
              Потом сделаю, как потребуется, в следующем спринте*/
              onClick={() => dispatch(requestLogout(refreshToken))}
              className={stylesOrders.logoutButton}
            >Выход
            </button>

            <ProfileBlockAbout>
              <ProfileTextAbout>В этом разделе вы можете</ProfileTextAbout>
              <ProfileTextAbout>просмотреть свою историю заказов</ProfileTextAbout>
            </ProfileBlockAbout>

          </ProfileNavBlock>          

        </div>

      </AppMainBlock>

    </AppPage>
  )
};

export default OrdersPage;