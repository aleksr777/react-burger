import appStyles from './app.module.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  NotFound404,
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  IngredientPage
} from '../../pages/pages';

const App = () => {

  return (

    <div className={appStyles.app}>

        <BrowserRouter>
          <Routes>
            <Route path="*" element={<NotFound404 />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/ingredients/:id" element={<IngredientPage />} />
          </Routes>
        </BrowserRouter >

    </div >

  )
};

export default App;