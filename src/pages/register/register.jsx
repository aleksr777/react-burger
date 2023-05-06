import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { registerUserRequest } from '../../services/register-user/register-user-actions';
import FormTitle from '../../components/form-title/form-title';
import FormInput from '../../components/form-input/form-input';
import FormButton from '../../components/form-button/form-button';
import FormLink from '../../components/form-link/form-link';
import FormText from '../../components/form-text/form-text';
import FormСontainer from '../../components/form-container/form-container';
import Loader from '../../components/loader/loader';

const registerUserState = state => state.registerUser;


const RegisterPage = () => {

  const dispatch = useDispatch();

  const [inputsData, setInputsData] = useState({
    valueName: '',
    valueEmail: '',
    valuePassword: '',
  });

  const { isLoading, isError } = useSelector(registerUserState);

  const handleInputChange = (e, value) => {
    setInputsData({ ...inputsData, [value]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(registerUserRequest(
      inputsData.valueName,
      inputsData.valueEmail,
      inputsData.valuePassword
    ));
  }

  return (
    <>
      <Loader size={100} isLoading={isLoading} isError={isError} />

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
    </>
  )
};

export default RegisterPage;