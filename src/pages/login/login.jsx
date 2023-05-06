import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { requestLogin } from '../../services/authorization/auth-actions';
import FormTitle from '../../components/form-title/form-title';
import FormInput from '../../components/form-input/form-input';
import FormLink from '../../components/form-link/form-link';
import FormText from '../../components/form-text/form-text';
import FormButton from '../../components/form-button/form-button';
import FormСontainer from '../../components/form-container/form-container';
import Loader from '../../components/loader/loader';

const getAuthState = state => state.authorization;


const LoginPage = () => {

  const dispatch = useDispatch();

  const [inputsData, setInputsData] = useState({
    valueEmail: '',
    valuePassword: '',
  });

  const { isLoading, isError } = useSelector(getAuthState);

  const handleInputChange = (e, value) => {
    setInputsData({ ...inputsData, [value]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(requestLogin(inputsData.valueEmail, inputsData.valuePassword));
  }

  return (
    <>
      <Loader size={100} isLoading={isLoading} isError={isError} />

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
    </>
  )
}

export default LoginPage;