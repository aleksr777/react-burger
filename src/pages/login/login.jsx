import stylesLoginPage from './login.module.css';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { requestLogin } from '../../services/authorization/auth-actions';
import FormInput from '../../components/form-input/form-input';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from '../../hooks/useForm';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { values, handleChange } = useForm({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(requestLogin(values.email, values.password));
  };

  return (
    <div className={stylesLoginPage.container}>
      <h1 className={stylesLoginPage.title}>Вход</h1>

      <form onSubmit={handleSubmit} autoComplete='off'>
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

        <div className={stylesLoginPage.submitBox}>
          <Button htmlType="submit" type="primary" size="medium">
            Войти
          </Button>
        </div>
      </form>

      <p className={stylesLoginPage.text}>
        Вы — новый пользователь? <Link to='/register' className={stylesLoginPage.link}>Зарегистрироваться</Link>
      </p>

      <p className={stylesLoginPage.text}>
        Забыли пароль? <Link to='/forgot-password' className={stylesLoginPage.link}>Восстановить пароль</Link>
      </p>
    </div>
  );
};

export default LoginPage;
