import FormTitle from '../../components/form-title/form-title';
import FormInput from '../../components/form-input/form-input';
import FormLink from '../../components/form-link/form-link';
import FormText from '../../components/form-text/form-text';
import FormButton from '../../components/form-button/form-button';
import FormСontainer from '../../components/form-container/form-container';
import { useState } from 'react';
import Loader from '../../components/loader/loader';
import AppPage from '../../components/app-page/app-page';
import AppHeader from '../../components/app-header/app-header';
import AppMainBlock from '../../components/app-main/app-main';


const LoginPage = () => {

  const [inputsData, setInputsData] = useState({
    valueEmail: '',
    valuePassword: '',
  });

  const handleInputChange = (e, value) => {
    setInputsData({ ...inputsData, [value]: e.target.value })
  }

  return (

    <AppPage>

      <AppHeader />

      <AppMainBlock>

        {/* <Loader size='large' isLoading={###.isLoading} /> */}

        <FormСontainer>

          <FormTitle text='Вход' />

          <FormInput
            inputType='email'
            onChange={e => handleInputChange(e, 'valueEmail')}
            value={inputsData.valueEmail}
            name='loginEmail'
            placeholder='E-mail'
            isIcon={false}
          />

          <FormInput
            inputType='password'
            onChange={e => handleInputChange(e, 'valuePassword')}
            value={inputsData.valuePassword}
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