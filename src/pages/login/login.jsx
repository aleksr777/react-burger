import FormTitle from '../../components/form-title/form-title';
import FormInput from '../../components/form-input/form-input';
import FormLink from '../../components/form-link/form-link';
import FormButton from '../../components/form-button/form-button';
import FormСontainer from '../../components/form-container/form-container';
import { useState } from 'react';
import Preloader from '../../ui/preloader/preloader';


const LoginPage = () => {

  const [valueEmail, setValueEmail] = useState('');

  const [valuePassword, setValuePassword] = useState('');


  const onChangeEmail = e => {
    setValueEmail(e.target.value)
  }

  const onChangePassword = e => {
    setValuePassword(e.target.value)
  }

  return (
    <>
      {/* {loadingState ? <Preloader /> : null} */}

      <FormСontainer>

        <FormTitle text='Вход' />

        <FormInput
          inputType='email'
          onChange={onChangeEmail}
          value={valueEmail}
          name='loginEmail'
          placeholder='E-mail'
          isIcon={false}
        />

        <FormInput
          inputType='password'
          onChange={onChangePassword}
          value={valuePassword}
          name='loginPassword'
          placeholder='Пароль'
          icon={undefined}
        />

        <FormButton text='Войти' />
        <FormLink text='Вы — новый пользователь? ' linkPath='/register' linkText='Зарегистрироваться' />
        <FormLink text='Забыли пароль? ' linkPath='/forgot-password' linkText='Восстановить пароль' />

      </FormСontainer>

    </>
  )
}

export default LoginPage;