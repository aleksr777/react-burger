import resetPasswordStyles from './reset-password.module.css';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useRef } from 'react';

const ResetPasswordPage = () => {

  const inputPasswordRef = useRef(null);
  const [valuePassword, setValuePassword] = useState('');
  const onChangePassword = e => {
    setValuePassword(e.target.value)
  }

  const inputCodeRef = useRef(null);
  const [valueCode, setValueCode] = useState('');
  const onChangeCode = e => {
    setValueCode(e.target.value)
  }

  return (

    <div className={resetPasswordStyles.container}>

      <PasswordInput
        ref={inputPasswordRef}
        onChange={onChangePassword}
        value={valuePassword}
        name={'password'}
        extraClass="mb-2"
        placeholder={'Введите новый пароль'}
      />

      <Input
        ref={inputCodeRef}
        type={'text'}
        onChange={onChangeCode}
        value={valueCode}
        name={'name'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="ml-1"
        placeholder={'Введите код из письма'}
      />

    </div >

  )
};

export { ResetPasswordPage };