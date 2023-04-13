import formInputStyles from './form-input.module.css';
import { PasswordInput, Input, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';

const FormInput = ({ inputType, ...otherProps }) => {

  let formElement;

  switch (inputType) {

    case 'email':
      formElement =
        <EmailInput
          {...otherProps}
          extraClass='mb-6'
        />
      break;

    case 'password':
      formElement =
        <PasswordInput
          {...otherProps}
          extraClass='mb-6'
        />
      break;

    case 'text':
      formElement =
        <Input
          {...otherProps}
          type='text'
          errorText='Ошибка'
          size='default'
          extraClass='mb-6'
        />
      break;

    default:
      return null;
  }

  return (
    <div className={formInputStyles.box}>
      {formElement}
    </div>
  )
}

export default FormInput;