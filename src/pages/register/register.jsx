import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { registerUserRequest } from '../../services/register-user/register-user-actions';
import { STORAGE_KEY_PREFIX } from '../../constants/constants';
import FormTitle from '../../components/form-title/form-title';
import FormInput from '../../components/form-input/form-input';
import FormButton from '../../components/form-button/form-button';
import FormLink from '../../components/form-link/form-link';
import FormText from '../../components/form-text/form-text';
import FormСontainer from '../../components/form-container/form-container';
import Loader from '../../components/loader/loader';
import AppPage from '../../components/app-page/app-page';
import AppHeader from '../../components/app-header/app-header';
import AppMainBlock from '../../components/app-main/app-main';

const registerUserState = state => state.registerUser;
const getAuthState = state => state.authorization;


const RegisterPage = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [inputsData, setInputsData] = useState({
    valueName: '',
    valueEmail: '',
    valuePassword: '',
  });

  const { isLoading, isError } = useSelector(registerUserState);

  const accessToken = localStorage.getItem(`${STORAGE_KEY_PREFIX}accessToken`);
  const refreshToken = localStorage.getItem(`${STORAGE_KEY_PREFIX}refreshToken`);

  const { success } = useSelector(getAuthState);

  const isAuth = (success && accessToken && refreshToken) ? true : false;

  /* Перенаправляем на ProfilePage, если пользователь уже авторизован */
  useEffect(() => {
    if (isAuth) {
      return navigate('/profile', { replace: true })
    }
  }, [isAuth]);

  function goToLoginPage() {
    navigate('/login');
  };

  const handleInputChange = (e, value) => {
    setInputsData({ ...inputsData, [value]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(registerUserRequest(
      goToLoginPage,
      inputsData.valueName,
      inputsData.valueEmail,
      inputsData.valuePassword
    ));
  }

  return (

    <AppPage>

      <Loader size={100} isLoading={isLoading} isError={isError} />

      <AppHeader />

      <AppMainBlock>

        {!isAuth && (

          <FormСontainer>

            <FormTitle text='Регистрация' />

            <form onSubmit={handleSubmit} autoComplete='off'>

              <FormInput
                inputType='text'
                value={inputsData.valueName}
                name='registerName'
                placeholder='Имя'
                onChange={e => handleInputChange(e, 'valueName')}
                icon={undefined}
                onIconClick={undefined}
              />

              <FormInput
                inputType='email'
                onChange={e => handleInputChange(e, 'valueEmail')}
                value={inputsData.valueEmail}
                name='registerEmail'
                placeholder='E-mail'
                isIcon={false}
              />

              <FormInput
                inputType='password'
                onChange={e => handleInputChange(e, 'valuePassword')}
                value={inputsData.valuePassword}
                name='registerPassword'
                placeholder='Пароль'
                icon={undefined}
              />

              <FormButton text='Зарегистрироваться' />

            </form>

            <FormText>
              Уже зарегистрированы? <FormLink linkPath='/login'>Войти</FormLink>
            </FormText>

          </FormСontainer>
        )}

      </AppMainBlock>

    </AppPage>
  )
};

export default RegisterPage;