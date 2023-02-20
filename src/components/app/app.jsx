import appStyles from './app.module.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import {
  NotFound404,
  HomePage,
  loginPage,
  registerPage,
  forgotPasswordPage,
  resetPasswordPage,
  profilePage,
  ingredientPage
} from '../../pages/index';

const App = () => {

  return (

    <div className={appStyles.app}>

      <AppHeader />

      <main className={appStyles.main}>

      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound404 />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<loginPage />} />
          <Route path="/register" element={<registerPage />} />
          <Route path="/forgot-password" element={<forgotPasswordPage />} />
          <Route path="/reset-password" element={<resetPasswordPage />} />
          <Route path="/profile" element={<profilePage />} />
          <Route path="/ingredients/:id" element={<ingredientPage />} />
        </Routes>
      </BrowserRouter >

      </main>

    </div >

  )
};

export default App;