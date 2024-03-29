import styles from './register.module.css'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { Link } from "react-router-dom"
import { registerUserRequest } from '../../services/register-user/register-user-actions'
import FormInput from '../../components/form-input/form-input'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useForm } from '../../hooks/useForm'


const RegisterPage = () => {

  const dispatch = useAppDispatch()

  const { values, handleChange } = useForm( {
    name: '',
    email: '',
    password: '',
  } )

  const handleSubmit = ( e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault()
    dispatch( registerUserRequest( values.name, values.email, values.password ) )
  }

  return (
    <div className={ styles.container }>
      <h1 className={ styles.title }>Регистрация</h1>

      <form onSubmit={ handleSubmit } autoComplete='off'>
        <FormInput
          inputType='text'
          value={ values.name }
          name='name'
          placeholder='Имя'
          onChange={ handleChange }
          icon={ undefined }
        />

        <FormInput
          inputType='email'
          onChange={ handleChange }
          value={ values.email }
          name='email'
          placeholder='E-mail'
          isIcon={ false }
        />

        <FormInput
          inputType='password'
          onChange={ handleChange }
          value={ values.password }
          name='password'
          placeholder='Пароль'
          icon={ undefined }
        />

        <div className={ styles.submitBox }>
          <Button htmlType="submit" type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </div>
      </form>

      <p className={ styles.text }>
        Уже зарегистрированы? <Link to='/login' className={ styles.link }>Войти</Link>
      </p>
    </div>
  )
}

export default RegisterPage