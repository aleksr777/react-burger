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

const forgotPasswordState = state => state.forgotPassword;
const resetPasswordState = state => state.resetPassword;


const ResetPasswordPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isError } = useSelector(resetPasswordState);
  const forgotPassword = useSelector(forgotPasswordState);
  const resetPassword = useSelector(forgotPasswordState);

  const [inputsData, setInputsData] = useState({
    valuePassword: '',
    valueCode: '',
  });

  useEffect(() => {
    if (!forgotPassword.isSuccess && !resetPassword.isSuccess) {
      navigate('/forgot-password', { replace: true });
    }
  }, []);

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
    <>
      <Loader size={100} isLoading={isLoading} isError={isError} />

      {forgotPassword.isSuccess && (

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
      )}
    </>
  )
};

export default ResetPasswordPage;