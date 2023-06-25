import styles from './profile-edit-user-block.module.css'
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { requestChangeUserData } from '../../services/authorization/auth-actions'
import FormInput from '../form-input/form-input'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { getAuthState } from '../../utils/selectors'
import { AuthStateType, UserDataType } from '../../types/types'


const ProfileEditUserBlock = () => {

  const dispatch = useDispatch()

  const { user }: AuthStateType = useSelector( getAuthState )

  const userData: UserDataType = {
    name: user.name,
    email: user.email,
    password: '',
  }

  const [ inputsData, setInputsData ] = useState<UserDataType>( userData )
  const [ isFormChanged, setIsFormChanged ] = useState( false )

  const handleInputChange = ( e: ChangeEvent<HTMLInputElement> ) => {
    setInputsData( { ...inputsData, [ e.target.name ]: e.target.value } )
  }

  /* Проверяем, внесены ли изменения */
  useEffect( () => {
    for ( const key in userData ) {
      if ( userData[ key ] !== inputsData[ key ] ) {
        setIsFormChanged( true )
        return
      }
    }
    setIsFormChanged( false )
  }, [ inputsData, userData ] )

  const handleSubmit = ( e: FormEvent<HTMLFormElement> ) => {
    e.preventDefault()
    if ( !isFormChanged ) {
      return null
    }
    dispatch( requestChangeUserData( inputsData, setInputsData ) as any )
  }

  const cancelInputChange = ( e: React.MouseEvent<HTMLButtonElement> ) => {
    e.preventDefault()
    if ( !isFormChanged ) {
      return null
    }
    setInputsData( userData )
  }

  return (
    <form className={ styles.form } onSubmit={ handleSubmit } autoComplete='off'>
      <div className={ styles.editingBlock }>
        <FormInput
          inputType='text'
          placeholder='Имя'
          name='name'
          icon='EditIcon'
          value={ inputsData.name }
          onChange={ handleInputChange }
        />

        <FormInput
          inputType='email'
          value={ inputsData.email }
          name='email'
          placeholder='Логин'
          icon='EditIcon'
          isIcon={ true }
          onChange={ handleInputChange }
        />

        <FormInput
          inputType='password'
          name='password'
          value={ inputsData.password }
          placeholder='Пароль'
          icon='EditIcon'
          onChange={ handleInputChange }
        />

        <div className={ styles.buttonsBlock }>
          <button
            className={ styles.cancelButton }
            onClick={ cancelInputChange }
            disabled={ !isFormChanged }
          >
            Отмена
          </button>

          <div className={ styles.submitBox }>
            <Button
              htmlType='submit'
              type='primary'
              size='medium'
              style={ { opacity: isFormChanged ? '' : '0' } }
              disabled={ !isFormChanged }
            >
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ProfileEditUserBlock
