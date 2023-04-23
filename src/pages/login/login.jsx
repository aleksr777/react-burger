import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { requestLogin } from '../../services/login/login-actions';
import FormTitle from '../../components/form-title/form-title';
import FormInput from '../../components/form-input/form-input';
import FormLink from '../../components/form-link/form-link';
import FormText from '../../components/form-text/form-text';
import FormButton from '../../components/form-button/form-button';
import FormСontainer from '../../components/form-container/form-container';
import Loader from '../../components/loader/loader';
import AppPage from '../../components/app-page/app-page';
import AppHeader from '../../components/app-header/app-header';
import AppMainBlock from '../../components/app-main/app-main';


const getLoginState = state => state.login;

const LoginPage = () => {

  const { isLoading, isError } = useSelector(getLoginState);

  const navigate = useNavigate();

  const location = useLocation();

  const fromPage = location.state?.from?.pathname || '/';

  const dispatch = useDispatch();

  const [inputsData, setInputsData] = useState({
    valueEmail: '',
    valuePassword: '',
  });

  const handleInputChange = (e, value) => {
    setInputsData({ ...inputsData, [value]: e.target.value });
  }

  const goBackToPage = () => {
      navigate(`${fromPage}`);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(requestLogin(goBackToPage, inputsData.valueEmail, inputsData.valuePassword));
  }


  return (

    <AppPage>

      <Loader size={100} isLoading={isLoading} isError={isError} />

      <AppHeader />

      <AppMainBlock>

        <FormСontainer>

          <FormTitle text='Вход' />

          <form onSubmit={handleSubmit} autoComplete='off'>

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

          </form>

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