import registerStyles from './register.module.css';
import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useRef } from 'react';

const RegisterPage = () => {

  const inputNameRef = useRef(null);
  const [valueName, setValueName] = useState('');
  const onChangeName = e => {
    setValueName(e.target.value)
  }

  const inputEmailRef = useRef(null);
  const [valueEmail, setValueEmail] = useState('');
  const onChangeEmail = e => {
    setValueEmail(e.target.value)
  }

  const inputPasswordRef = useRef(null);
  const [valuePassword, setValuePassword] = useState('');
  const onChangePassword = e => {
    setValuePassword(e.target.value)
  }

  return (

    <div className={registerStyles.container}>

      <Input
        ref={inputNameRef}
        type={'text'}
        onChange={onChangeName}
        value={valueName}
        name={'name'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="ml-1"
        placeholder={'Имя'}
      />

      <EmailInput
        ref={inputEmailRef}
        onChange={onChangeEmail}
        value={valueEmail}
        name={'email'}
        isIcon={false}
        placeholder={'E-mail'}
      />

      <PasswordInput
        ref={inputPasswordRef}
        onChange={onChangePassword}
        value={valuePassword}
        name={'password'}
        extraClass="mb-2"
        placeholder={'Пароль'}
      />

    </div>
  )
};

export { RegisterPage };