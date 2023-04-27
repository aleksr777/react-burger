import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { forgotPasswordRequest } from '../../services/forgot-password/forgot-password-actions';
import FormTitle from '../../components/form-title/form-title';
import FormInput from '../../components/form-input/form-input';
import FormButton from '../../components/form-button/form-button';
import FormLink from '../../components/form-link/form-link';
import FormText from '../../components/form-text/form-text';
import FormСontainer from '../../components/form-container/form-container';
import Loader from '../../components/loader/loader';
import AppPage from '../../components/app-page/app-page';
import AppHeader from '../../components/app-header/app-header';
import AppMainBlock from '../../components/app-main/app-main';

const forgotPasswordState = state => state.forgotPassword;
const getAuthState = state => state.authorization;


const ForgotPasswordPage = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [valueEmail, setValueEmail] = useState('');

  const { isLoading, isError } = useSelector(forgotPasswordState);

  const { success, accessToken, refreshToken } = useSelector(getAuthState);

  const isAuth = (success && accessToken && refreshToken) ? true : false;

  useEffect(() => {
    if (isAuth) {
      return navigate('/profile', { replace: true })
    }
  }, [isAuth]);

  const goToResetPasswordPage = () => navigate('/reset-password');

  const onChangeEmail = e => {
    setValueEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(forgotPasswordRequest(goToResetPasswordPage, valueEmail));
  }

  return (

    <AppPage>

      <AppHeader />

      <Loader size={100} isLoading={isLoading} isError={isError} />

      <AppMainBlock>

        {!isAuth && (

          <FormСontainer>

            <FormTitle text='Восстановление пароля' />

            <form onSubmit={handleSubmit} autoComplete='off'>

              <FormInput
                inputType='email'
                onChange={onChangeEmail}
                value={valueEmail}
                name='forgotEmail'
                placeholder='Укажите e-mail'
                isIcon={false}
              />

              <FormButton text='Восстановить' />

            </form>

            <FormText>
              Вспомнили пароль? <FormLink linkPath='/login'>Войти</FormLink>
            </FormText>

          </FormСontainer >
        )}

      </AppMainBlock>

    </AppPage>
  )
};

export default ForgotPasswordPage;