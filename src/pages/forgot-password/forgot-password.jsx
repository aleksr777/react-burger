import FormTitle from '../../components/form-title/form-title';
import FormInput from '../../components/form-input/form-input';
import FormButton from '../../components/form-button/form-button';
import FormLink from '../../components/form-link/form-link';
import FormСontainer from '../../components/form-container/form-container';
import { useState } from 'react';

const ForgotPasswordPage = () => {

  const [valueEmail, setValueEmail] = useState('');
  const onChangeEmail = evt => {
    setValueEmail(evt.target.value)
  }

  return (

    <FormСontainer>

      <FormTitle text='Восстановление пароля' />

      <FormInput
        inputType='email'
        onChange={onChangeEmail}
        value={valueEmail}
        name='forgotEmail'
        placeholder='Укажите e-mail'
        isIcon={false}
      />

      <FormButton text='Восстановить' />
      <FormLink text='Вспомнили пароль? ' linkPath='/login' linkText='Войти' />

    </FormСontainer >

  )
};

export default ForgotPasswordPage;