import stylesResetPasswordPage from './reset-password.module.css';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import FormInput from '../../components/form-input/form-input';
import { resetPasswordRequest } from '../../services/reset-password/reset-password-actions';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getForgotPasswordState, getResetPasswordState } from '../../utils/selectors';


const ResetPasswordPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const forgotPassword = useSelector(getForgotPasswordState);
  const resetPassword = useSelector(getResetPasswordState);

  const [inputsData, setInputsData] = useState({
    valuePassword: '',
    valueCode: '',
  });

  useEffect(() => {
    if (!forgotPassword.isSuccess && !resetPassword.isSuccess) {
      navigate('/forgot-password', { replace: true });
    }
  }, []);

  const goToLoginPage = () => navigate('/login');

  const handleInputChange = (e, value) => {
    setInputsData({ ...inputsData, [value]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(resetPasswordRequest(
      goToLoginPage,
      inputsData.valuePassword,
      inputsData.valueCode
    ));
  }

  return (

    forgotPassword.isSuccess && (

      <div className={stylesResetPasswordPage.container}>

        <h1 className={stylesResetPasswordPage.title}>Восстановление пароля</h1>

        <form onSubmit={handleSubmit} autoComplete='off'>

          <FormInput
            inputType='password'
            onChange={e => handleInputChange(e, 'valuePassword')}
            value={inputsData.valuePassword}
            name='resetPassword'
            placeholder='Введите новый пароль'
            icon={undefined}
          />

          <FormInput
            inputType='text'
            value={inputsData.valueCode}
            name='resetCodeEmail'
            placeholder='Введите код из письма'
            onChange={e => handleInputChange(e, 'valueCode')}
            icon={undefined}
            onIconClick={undefined}
          />


          <div className={stylesResetPasswordPage.submitBox}>
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
            >
              Сохранить
            </Button>
          </div>

        </form>

        <p className={stylesResetPasswordPage.text}>
          Вспомнили пароль? <Link to='/login' className={stylesResetPasswordPage.link}>Войти</Link>
        </p>

      </div >
    )
  )
};

export default ResetPasswordPage;