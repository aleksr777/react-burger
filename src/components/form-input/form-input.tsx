import formInputStyles from './form-input.module.css'
import { PasswordInput, Input, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'

interface Props {
  inputType: 'email' | 'password' | 'text'
  value: string
  onChange: ( event: React.ChangeEvent<HTMLInputElement> ) => void
}


const FormInput = ( { inputType, ...otherProps }: Props ) => {

  let formElement: JSX.Element | null = null;

  switch ( inputType ) {
    case 'email':
      formElement = (
        <EmailInput { ...otherProps } extraClass="mb-6" size="default" />
      )
      break

    case 'password':
      formElement = (
        <PasswordInput { ...otherProps } extraClass="mb-6" size="default" />
      )
      break

    case 'text':
      formElement = (
        <Input
          { ...otherProps }
          type="text"
          errorText="Ошибка"
          size="default"
          extraClass="mb-6"
        />
      )
      break

    default:
      return null
  }

  return <div className={ formInputStyles.box }>{ formElement }</div>
}

export default FormInput
