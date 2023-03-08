import FormTitle from '../../components/form-title/form-title';
import FormInput from '../../components/form-input/form-input';
import FormButton from '../../components/form-button/form-button';
import FormLink from '../../components/form-link/form-link';
import FormСontainer from '../../components/form-container/form-container';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { resetPasswordRequest } from '../../services/actions/reset-password-actions';
import Preloader from '../../ui/preloader/preloader';


const resetPasswordState = state => state.resetPassword;

const ResetPasswordPage = () => {

  const passwordState = useSelector(resetPasswordState);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  function goToLoginPage() {
    navigate('/login')
  };

  useEffect(() => {
    if (passwordState.success) {
      return goToLoginPage()
    }
  }, [passwordState.success]);

  const [valuePassword, setValuePassword] = useState('');

  const [valueCode, setValueCode] = useState('');


  const onChangePassword = e => {
    setValuePassword(e.target.value)
  }

  const onChangeCode = e => {
    setValueCode(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(resetPasswordRequest(valuePassword, valueCode));
  }

  return (
    <>
      {passwordState.loadingState ? <Preloader /> : null}

      <FormСontainer>

        <FormTitle text='Восстановление пароля' />

        <form onSubmit={handleSubmit} autoComplete='off'>

          <FormInput
            inputType='password'
            onChange={onChangePassword}
            value={valuePassword}
            name='resetPassword'
            placeholder='Введите новый пароль'
            icon={undefined}
          />

          <FormInput
            inputType='default'
            value={valueCode}
            name='resetCodeEmail'
            placeholder='Введите код из письма'
            onChange={onChangeCode}
            icon={undefined}
            onIconClick={undefined}
          />

          <FormButton text='Сохранить' />

        </form>

        <FormLink text='Вспомнили пароль? ' linkPath='/login' linkText='Войти' />

      </FormСontainer >

    </>
  )
};

export default ResetPasswordPage;