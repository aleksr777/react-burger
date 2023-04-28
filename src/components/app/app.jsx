import { Routes, Route } from 'react-router-dom';
import ProtectedRouteElement from '../protected-route/protected-route';
import {
  NotFoundPage,
  HomePage,
  FeedPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  OrdersPage,
  IngredientPage
} from '../../pages/pages';

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