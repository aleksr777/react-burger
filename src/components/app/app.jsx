import { Routes, Route } from 'react-router-dom';
import {
  NotFoundPage,
  HomePage,
  FeedPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  IngredientPage
} from '../../pages/pages';

const App = () => {

  return (

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/ingredients/:id" element={<IngredientPage />} />
      <Route path="/feed" element={<FeedPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>

  )
};

export default App;