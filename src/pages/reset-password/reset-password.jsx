import FormTitle from '../../components/form-title/form-title';
import FormInput from '../../components/form-input/form-input';
import FormButton from '../../components/form-button/form-button';
import FormLink from '../../components/form-link/form-link';
import FormСontainer from '../../components/form-container/form-container';
import { useState } from 'react';

const ResetPasswordPage = () => {

  const [valuePassword, setValuePassword] = useState('');
  const onChangePassword = evt => {
    setValuePassword(evt.target.value)
  }

  const [valueCode, setValueCode] = useState('');
  const onChangeCode = evt => {
    setValueCode(evt.target.value)
  }

  return (

    <FormСontainer>

      <FormTitle text='Восстановление пароля' />

      <FormInput
        inputType='password'
        onChange={onChangePassword}
        value={valuePassword}
        name='resetPassword'
        placeholder='Введите новый пароль'
        icon={undefined}
      />

      <FormInput
        inputType='default'
        value={valueCode}
        name='resetCodeEmail'
        placeholder='Введите код из письма'
        onChange={onChangeCode}
        icon={undefined}
        onIconClick={undefined}
      />

      <FormButton text='Сохранить' />
      <FormLink text='Вспомнили пароль? ' linkPath='/login' linkText='Войти' />

    </FormСontainer >

  )
};

export default ResetPasswordPage;