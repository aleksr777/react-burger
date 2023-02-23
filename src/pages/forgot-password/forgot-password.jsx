import forgotPasswordStyles from './forgot-password.module.css';
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useRef } from 'react';

const ForgotPasswordPage = () => {

  const inputPasswordRef = useRef(null);
  const [valueEmail, setValueEmail] = useState('');
  const onChangeEmail = e => {
    setValueEmail(e.target.value)
  }

  return (

    <div className={forgotPasswordStyles.container}>

      <EmailInput
        ref={inputPasswordRef}
        onChange={onChangeEmail}
        value={valueEmail}
        name={'email'}
        isIcon={false}
        placeholder={'Укажите e-mail'}
      />

    </div >

  )
};

export { ForgotPasswordPage };