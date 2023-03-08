import FormTitle from '../../components/form-title/form-title';
import FormInput from '../../components/form-input/form-input';
import FormButton from '../../components/form-button/form-button';
import FormLink from '../../components/form-link/form-link';
import FormСontainer from '../../components/form-container/form-container';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { registerNewUser } from '../../services/actions/register-user-actions';
import Preloader from '../../ui/preloader/preloader';

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
    <>
      {userState.loadingState ? <Preloader /> : null}

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

        <FormLink text='Уже зарегистрированы? ' linkPath='/login' linkText='Войти' />

      </FormСontainer>

    </>
  )
};

export default RegisterPage;