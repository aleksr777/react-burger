import React from 'react'
import styles from './login.module.css'
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import { requestLogin } from '../../services/authorization/auth-actions'
import FormInput from '../../components/form-input/form-input'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useForm } from '../../hooks/useForm'


const LoginPage = () => {

  const dispatch = useDispatch()

  const { values, handleChange } = useForm( { email: '', password: '' } )

  const handleSubmit = ( e: React.FormEvent ) => {
    e.preventDefault()
    dispatch( requestLogin( values.email, values.password ) as any )
  }

  return (
    <div className={ styles.container }>
      <h1 className={ styles.title }>Вход</h1>

      <form onSubmit={ handleSubmit } autoComplete='off'>
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
            Войти
          </Button>
        </div>
      </form>

      <p className={ styles.text }>
        Вы — новый пользователь? <Link to='/register' className={ styles.link }>Зарегистрироваться</Link>
      </p>

      <p className={ styles.text }>
        Забыли пароль? <Link to='/forgot-password' className={ styles.link }>Восстановить пароль</Link>
      </p>
    </div>
  )
}

export default LoginPage
