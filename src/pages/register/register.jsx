import stylesRegisterPage from './register.module.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { registerUserRequest } from '../../services/register-user/register-user-actions';
import FormInput from '../../components/form-input/form-input';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';


const RegisterPage = () => {

  const dispatch = useDispatch();

  const [inputsData, setInputsData] = useState({
    valueName: '',
    valueEmail: '',
    valuePassword: '',
  });

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

    <div className={stylesRegisterPage.container}>

      <h1 className={stylesRegisterPage.title}>Регистрация</h1>

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


        <div className={stylesRegisterPage.submitBox}>
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
          >
            Зарегистрироваться
          </Button>
        </div>

      </form>

      <p className={stylesRegisterPage.text}>
        Уже зарегистрированы? <Link to='/login' className={stylesRegisterPage.link}>Войти</Link>
      </p>

    </div>
  )
};

export default RegisterPage;