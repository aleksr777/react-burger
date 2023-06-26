import styles from './reset-password.module.css'
import { useEffect } from 'react'
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import FormInput from '../../components/form-input/form-input'
import { resetPasswordRequest } from '../../services/reset-password/reset-password-actions'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { getForgotPasswordState, getResetPasswordState } from '../../utils/selectors'
import { useForm } from '../../hooks/useForm'
import { LoadingStateType } from '../../types/types'


const ResetPasswordPage = () => {

  const { values, handleChange } = useForm( {
    valuePassword: '',
    valueCode: '',
  } )

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const forgotPassword: LoadingStateType = useSelector( getForgotPasswordState )
  const resetPassword: LoadingStateType = useSelector( getResetPasswordState )

  useEffect( () => {
    if ( !forgotPassword.isSuccess && !resetPassword.isSuccess ) {
      navigate( '/forgot-password', { replace: true } )
    }
  }, [] )

  const goToLoginPage = () => navigate( '/login' )

  const handleSubmit = ( e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault()
    dispatch(
      resetPasswordRequest(
        goToLoginPage,
        values.valuePassword,
        values.valueCode
      ) as any
    )
  }

  return (
    forgotPassword.isSuccess && (
      <div className={ styles.container }>
        <h1 className={ styles.title }>Восстановление пароля</h1>
        <form onSubmit={ handleSubmit } autoComplete='off'>
          <FormInput
            inputType='password'
            onChange={ handleChange }
            value={ values.valuePassword }
            name='valuePassword'
            placeholder='Введите новый пароль'
            icon={ undefined }
          />
          <FormInput
            inputType='text'
            value={ values.valueCode }
            name='valueCode'
            placeholder='Введите код из письма'
            onChange={ handleChange }
            icon={ undefined }
          />
          <div className={ styles.submitBox }>
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
            >
              Сохранить
            </Button>
          </div>
        </form>
        <p className={ styles.text }>
          Вспомнили пароль? <Link to='/login' className={ styles.link }>Войти</Link>
        </p>
      </div>
    )
  )
}

export default ResetPasswordPage