import { Routes, Route } from 'react-router-dom';
import ProtectedRouteElement from '../protected-route/protected-route';

import NotFoundPage from '../../pages/not-found/not-found';
import HomePage from '../../pages/home/home';
import FeedPage from '../../pages/feed/feed';
import ProfilePage from '../../pages/profile/profile';
import OrdersPage from '../../pages/orders/orders';
import IngredientPage from '../../pages/ingredient/ingredient';
import LoginPage from '../../pages/login/login';
import RegisterPage from '../../pages/register/register';
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password';
import ResetPasswordPage from '../../pages/reset-password/reset-password';

const App = () => {

  return (

    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/" element={
        <ProtectedRouteElement>
          <HomePage />
        </ProtectedRouteElement>
      } />
      <Route path="/profile" element={
        <ProtectedRouteElement>
          <ProfilePage />
        </ProtectedRouteElement>
      } />
      <Route path="/orders" element={
        <ProtectedRouteElement>
          <OrdersPage />
        </ProtectedRouteElement>
      } />
      <Route path="/ingredients/:id" element={
        <ProtectedRouteElement>
          <IngredientPage />
        </ProtectedRouteElement>
      } />
      <Route path="/feed" element={
        <ProtectedRouteElement>
          <FeedPage />
        </ProtectedRouteElement>
      } />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>

  )
};

export default App;