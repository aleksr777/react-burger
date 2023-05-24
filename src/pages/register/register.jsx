import stylesRegisterPage from './register.module.css';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { registerUserRequest } from '../../services/register-user/register-user-actions';
import FormInput from '../../components/form-input/form-input';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from '../../hooks/useForm';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { values, handleChange } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUserRequest(values.name, values.email, values.password));
  };

  return (
    <div className={stylesRegisterPage.container}>
      <h1 className={stylesRegisterPage.title}>Регистрация</h1>

      <form onSubmit={handleSubmit} autoComplete='off'>
        <FormInput
          inputType='text'
          value={values.name}
          name='name'
          placeholder='Имя'
          onChange={handleChange}
          icon={undefined}
          onIconClick={undefined}
        />

        <FormInput
          inputType='email'
          onChange={handleChange}
          value={values.email}
          name='email'
          placeholder='E-mail'
          isIcon={false}
        />

        <FormInput
          inputType='password'
          onChange={handleChange}
          value={values.password}
          name='password'
          placeholder='Пароль'
          icon={undefined}
        />

        <div className={stylesRegisterPage.submitBox}>
          <Button htmlType="submit" type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </div>
      </form>

      <p className={stylesRegisterPage.text}>
        Уже зарегистрированы? <Link to='/login' className={stylesRegisterPage.link}>Войти</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
