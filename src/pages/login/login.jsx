import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { requestLogin } from '../../services/authorization/auth-actions';
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

const getAuthState = state => state.authorization;


const LoginPage = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const dispatch = useDispatch();

  const [inputsData, setInputsData] = useState({
    valueEmail: '',
    valuePassword: '',
  });

  const { isLoading, isError, success, accessToken, refreshToken } = useSelector(getAuthState);

  const isAuth = (success && accessToken && refreshToken) ? true : false;

  const fromPage = location.state?.from?.pathname || '/';

/* Возвращаем на предыдущую страницу, если пользователь уже авторизован */
  useEffect(() => {
    if (isAuth) {
      return navigate('/', { replace: true })
    }
  }, [isAuth]);

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

        {!isAuth && (

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
        )}

      </AppMainBlock>

    </AppPage>
  )
}

export default LoginPage;