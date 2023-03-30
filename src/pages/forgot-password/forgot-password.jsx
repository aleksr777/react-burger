import FormTitle from '../../components/form-title/form-title';
import FormInput from '../../components/form-input/form-input';
import FormButton from '../../components/form-button/form-button';
import FormLink from '../../components/form-link/form-link';
import FormText from '../../components/form-text/form-text';
import FormСontainer from '../../components/form-container/form-container';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { resetEmailRequest } from '../../services/reset-email/reset-email-actions';
import Loader from '../../components/loader/loader';
import AppPage from '../../components/app-page/app-page';
import AppHeader from '../../components/app-header/app-header';
import AppMainBlock from '../../components/app-main/app-main';


const resetEmailState = state => state.resetEmail;

const ForgotPasswordPage = () => {

  const emailState = useSelector(resetEmailState);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [valueEmail, setValueEmail] = useState('');

  function goToResetPasswordPage() {
    navigate('/reset-password')
  }

  useEffect(() => {
    if (emailState.success) {
      return goToResetPasswordPage();
    }
  }, [emailState.success]);

  const onChangeEmail = e => {
    setValueEmail(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(resetEmailRequest(valueEmail));
  }

  return (

    <AppPage>

      <AppHeader />

      <Loader size='large' isLoading={emailState.isLoading} />
      
      <AppMainBlock>

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

      </AppMainBlock>

    </AppPage>
  )
};

export default ForgotPasswordPage;