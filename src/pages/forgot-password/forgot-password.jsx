import { useState } from 'react';
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

const forgotPasswordState = state => state.forgotPassword;


const ForgotPasswordPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [valueEmail, setValueEmail] = useState('');

  const { isLoading, isError } = useSelector(forgotPasswordState);

  const goToResetPasswordPage = () => navigate('/reset-password');

  const onChangeEmail = e => {
    setValueEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(forgotPasswordRequest(goToResetPasswordPage, valueEmail));
  }

  return (
    <>
      <Loader size={100} isLoading={isLoading} isError={isError} />

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
    </>
  )
};

export default ForgotPasswordPage;