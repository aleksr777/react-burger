import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import FormTitle from '../../components/form-title/form-title';
import FormInput from '../../components/form-input/form-input';
import FormButton from '../../components/form-button/form-button';
import FormLink from '../../components/form-link/form-link';
import FormText from '../../components/form-text/form-text';
import FormСontainer from '../../components/form-container/form-container';
import { resetPasswordRequest } from '../../services/reset-password/reset-password-actions';
import Loader from '../../components/loader/loader';
import AppPage from '../../components/app-page/app-page';
import AppHeader from '../../components/app-header/app-header';
import AppMainBlock from '../../components/app-main/app-main';

const forgotPasswordState = state => state.forgotPassword;
const resetPasswordState = state => state.resetPassword;


const ResetPasswordPage = () => {

  const { isLoading, isError } = useSelector(resetPasswordState);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [inputsData, setInputsData] = useState({
    valuePassword: '',
    valueCode: '',
  });

  const { success } = useSelector(forgotPasswordState);
  useEffect(() => {
    !success && navigate('/forgot-password')
  }, []);
  if (!success) { return null };

  const goToLoginPage = () => navigate('/login');

  const handleInputChange = (e, value) => {
    setInputsData({ ...inputsData, [value]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(resetPasswordRequest(
      goToLoginPage,
      inputsData.valuePassword,
      inputsData.valueCode
    ));
  }

  return (

    <AppPage>

      <AppHeader />

      <AppMainBlock>

        <Loader size={100} isLoading={isLoading} isError={isError} />

        <FormСontainer>

          <FormTitle text='Восстановление пароля' />

          <form onSubmit={handleSubmit} autoComplete='off'>

            <FormInput
              inputType='password'
              onChange={e => handleInputChange(e, 'valuePassword')}
              value={inputsData.valuePassword}
              name='resetPassword'
              placeholder='Введите новый пароль'
              icon={undefined}
            />

            <FormInput
              inputType='text'
              value={inputsData.valueCode}
              name='resetCodeEmail'
              placeholder='Введите код из письма'
              onChange={e => handleInputChange(e, 'valueCode')}
              icon={undefined}
              onIconClick={undefined}
            />

            <FormButton text='Сохранить' />

          </form>

          <FormText>
            Вспомнили пароль? <FormLink linkPath='/login'>Войти</FormLink>
          </FormText>

        </FormСontainer >

      </AppMainBlock>

    </AppPage>
  )
};

export default ResetPasswordPage;