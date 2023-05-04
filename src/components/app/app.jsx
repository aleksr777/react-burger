import { Routes, Route, useLocation } from 'react-router-dom';
import ProtectedRouteElement from '../protected-route/protected-route';
import AppLayout from '../app-layout/app-layout';
import ProfileEditUserBlock from '../profile-edit-user-block/profile-edit-user-block';
import ProfileOdersBlock from '../profile-orders-block/profile-orders-block';

import HomePage from '../../pages/home/home';
import FeedPage from '../../pages/feed/feed';
import ProfilePage from '../../pages/profile/profile';
import OrdersPage from '../profile-orders-block/profile-orders-block';
import IngredientPage from '../../pages/ingredient/ingredient';
import ModalIngredientDetails from '../modal-ingredient-details/modal-ingredient-details';
import LoginPage from '../../pages/login/login';
import RegisterPage from '../../pages/register/register';
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password';
import ResetPasswordPage from '../../pages/reset-password/reset-password';
import NotFoundPage from '../../pages/not-found/not-found';

const App = () => {

  const location = useLocation();
  const background = location.state && location.state.from;

  return (
    <>
      <Routes location={background || location}>

        <Route path='/' element={<AppLayout />}>

          <Route index element={<HomePage />} />

          <Route path='login' element={<LoginPage />} />

          <Route path='register' element={<RegisterPage />} />

          <Route path='forgot-password' element={<ForgotPasswordPage />} />

          <Route path='reset-password' element={<ResetPasswordPage />} />

          <Route path='ingredients/:id' element={<IngredientPage />} />

          <Route path='profile/' element={
            <ProtectedRouteElement>
              <ProfilePage />
            </ProtectedRouteElement>
          }>
            <Route index element={<ProfileEditUserBlock />} />
            <Route path='orders' element={<ProfileOdersBlock />} />
          </Route>

          <Route path='feed' element={
            <ProtectedRouteElement>
              <FeedPage />
            </ProtectedRouteElement>
          } />

        </Route>

        <Route path='*' element={<NotFoundPage />} />
        <Route path='404' element={<NotFoundPage />} />

      </Routes>

      {background && (
        <Routes>
          <Route path='ingredients/:id' element={
            <ModalIngredientDetails />
          } />
        </Routes>
      )}
    </>
  )
};

export default App;