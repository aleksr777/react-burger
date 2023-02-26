import FormTitle from '../../components/form-title/form-title';
import FormInput from '../../components/form-input/form-input';
import FormButton from '../../components/form-button/form-button';
import FormLink from '../../components/form-link/form-link';
import FormСontainer from '../../components/form-container/form-container';
import { useState } from 'react';

const RegisterPage = () => {

  const [valueName, setValueName] = useState('');
  const onChangeName = evt => {
    setValueName(evt.target.value)
  }

  const [valueEmail, setValueEmail] = useState('');
  const onChangeEmail = evt => {
    setValueEmail(evt.target.value)
  }

  const [valuePassword, setValuePassword] = useState('');
  const onChangePassword = evt => {
    setValuePassword(evt.target.value)
  }

  return (

    <FormСontainer>

      <FormTitle text='Регистрация' />

      <FormInput
        inputType='default'
        value={valueName}
        name='registerName'
        placeholder='Имя'
        onChange={onChangeName}
        icon={undefined}
        onIconClick={undefined}
      />

      <FormInput
        inputType='email'
        onChange={onChangeEmail}
        value={valueEmail}
        name='registerEmail'
        placeholder='E-mail'
        isIcon={false}
      />

      <FormInput
        inputType='password'
        onChange={onChangePassword}
        value={valuePassword}
        name='registerPassword'
        placeholder='Пароль'
        icon={undefined}
      />

      <FormButton text='Зарегистрироваться' />
      <FormLink text='Уже зарегистрированы? ' linkPath='/login' linkText='Войти' />

    </FormСontainer>
  )
};

export default RegisterPage;