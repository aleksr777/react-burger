import FormTitle from '../../components/form-title/form-title';
import FormInput from '../../components/form-input/form-input';
import FormLink from '../../components/form-link/form-link';
import FormText from '../../components/form-text/form-text';
import FormButton from '../../components/form-button/form-button';
import FormСontainer from '../../components/form-container/form-container';
import { useState } from 'react';
import Preloader from '../../components/preloader/preloader';
import AppPage from '../../components/app-page/app-page';
import AppHeader from '../../components/app-header/app-header';
import AppMainBlock from '../../components/app-main/app-main';


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

    <AppPage>

      <AppHeader />

      <AppMainBlock>

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

          <FormText>
            Вы — новый пользователь? <FormLink linkPath='/register'>Зарегистрироваться</FormLink>
          </FormText>

          <FormText>
            Забыли пароль? <FormLink linkPath='/forgot-password'>Восстановить пароль</FormLink>
          </FormText>

        </FormСontainer>

      </AppMainBlock>

    </AppPage>
  )
}

export default LoginPage;