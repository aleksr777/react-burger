import stylesLoginPage from './login.module.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { requestLogin } from '../../services/authorization/auth-actions';
import FormInput from '../../components/form-input/form-input';
import Loader from '../../components/loader/loader';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getAuthState } from '../../utils/selectors';


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

    <div className={stylesLoginPage.container}>

      <h1 className={stylesLoginPage.title}>Вход</h1>

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


        <div className={stylesLoginPage.submitBox}>
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
          >
            Войти
          </Button>
        </div>

      </form>

      <p className={stylesLoginPage.text}>
        Вы — новый пользователь? <Link to='/register' className={stylesLoginPage.link}>Зарегистрироваться</Link>
      </p>

      <p className={stylesLoginPage.text}>
        Забыли пароль? <Link to='/forgot-password' className={stylesLoginPage.link}>Восстановить пароль</Link>
      </p>

      <Loader size={100} isLoading={isLoading} isError={isError} />

    </div>
  )
}

export default LoginPage;