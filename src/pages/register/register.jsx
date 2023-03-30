import FormTitle from '../../components/form-title/form-title';
import FormInput from '../../components/form-input/form-input';
import FormButton from '../../components/form-button/form-button';
import FormLink from '../../components/form-link/form-link';
import FormText from '../../components/form-text/form-text';
import FormСontainer from '../../components/form-container/form-container';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { registerNewUser } from '../../services/register-user/register-user-actions';
import Loader from '../../components/loader/loader';
import AppPage from '../../components/app-page/app-page';
import AppHeader from '../../components/app-header/app-header';
import AppMainBlock from '../../components/app-main/app-main';

const registerUserState = state => state.registerUser;

const RegisterPage = () => {

  const userState = useSelector(registerUserState);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [valueName, setValueName] = useState('');

  const [valueEmail, setValueEmail] = useState('');

  const [valuePassword, setValuePassword] = useState('');

  function goToLoginPage() {
    navigate('/login')
  };

  useEffect(() => {
    if (userState.success) {
      return goToLoginPage()
    }
  }, [userState.success]);

  const onChangeName = e => {
    setValueName(e.target.value)
  }

  const onChangeEmail = e => {
    setValueEmail(e.target.value)
  }

  const onChangePassword = e => {
    setValuePassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(registerNewUser(valueName, valueEmail, valuePassword));
  }

  return (

    <AppPage>

      <AppHeader />

      <AppMainBlock>

        <Loader size='large' isLoading={userState.isLoading} />

        <FormСontainer>

          <FormTitle text='Регистрация' />

          <form onSubmit={handleSubmit} autoComplete='off'>

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

          </form>

          <FormText>
            Уже зарегистрированы? <FormLink linkPath='/login'>Войти</FormLink>
          </FormText>

        </FormСontainer>

      </AppMainBlock>

    </AppPage>
  )
};

export default RegisterPage;