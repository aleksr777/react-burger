import stylesForgotPasswordPage from './forgot-password.module.css';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from "react-router-dom";
import { forgotPasswordRequest } from '../../services/forgot-password/forgot-password-actions';
import { useForm } from '../../hooks/useForm';
import FormInput from '../../components/form-input/form-input';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { values, handleChange } = useForm({ email: '' });

  const goToResetPasswordPage = () => navigate('/reset-password');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPasswordRequest(goToResetPasswordPage, values.email));
  };

  return (
    <div className={stylesForgotPasswordPage.container}>
      <h1 className={stylesForgotPasswordPage.title}>Восстановление пароля</h1>

      <form onSubmit={handleSubmit} autoComplete='off'>
        <FormInput
          inputType='email'
          onChange={handleChange}
          value={values.email}
          name='email'
          placeholder='Укажите e-mail'
          isIcon={false}
        />

        <div className={stylesForgotPasswordPage.submitBox}>
          <Button htmlType="submit" type="primary" size="medium">
            Восстановить
          </Button>
        </div>
      </form>

      <p className={stylesForgotPasswordPage.text}>
        Вспомнили пароль? <Link to='/login' className={stylesForgotPasswordPage.link}>Войти</Link>
      </p>
    </div>
  );
};

export default ForgotPasswordPage;
