import stylesForgotPasswordPage from './forgot-password.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from "react-router-dom";
import { forgotPasswordRequest } from '../../services/forgot-password/forgot-password-actions';
import FormInput from '../../components/form-input/form-input';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';


const ForgotPasswordPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [valueEmail, setValueEmail] = useState('');

  const goToResetPasswordPage = () => navigate('/reset-password');

  const onChangeEmail = e => {
    setValueEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(forgotPasswordRequest(goToResetPasswordPage, valueEmail));
  }

  return (

    <div className={stylesForgotPasswordPage.container}>

      <h1 className={stylesForgotPasswordPage.title}>Восстановление пароля</h1>

      <form onSubmit={handleSubmit} autoComplete='off'>

        <FormInput
          inputType='email'
          onChange={onChangeEmail}
          value={valueEmail}
          name='forgotEmail'
          placeholder='Укажите e-mail'
          isIcon={false}
        />

        <div className={stylesForgotPasswordPage.submitBox}>
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
          >
            Восстановить
          </Button>
        </div>

      </form>

      <p className={stylesForgotPasswordPage.text}>
        Вспомнили пароль? <Link to='/login' className={stylesForgotPasswordPage.link}>Войти</Link>
      </p>

    </div >
  )
};

export default ForgotPasswordPage;