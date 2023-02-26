import formInputStyles from './form-input.module.css';
import { memo } from 'react';
import { PasswordInput, Input, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';

const FormInput = (props) => {
  return (
    <div className={formInputStyles.box}>
      {
        props.inputType === 'email'
          ? <EmailInput
            onChange={props.onChange}
            value={props.value}
            name={props.name}
            placeholder={props.placeholder}
            isIcon={props.isIcon}
            extraClass={'mb-6'} 
          />
          : (
            props.inputType === 'password'
              ? <PasswordInput
                onChange={props.onChange}
                value={props.value}
                name={props.name}
                placeholder={props.placeholder}
                icon={props.icon}
                extraClass={'mb-6'} 
              />
              : <Input
                type='text'
                size='default'
                error={props.false}
                errorText='Ошибка'
                value={props.value}
                name={props.name}
                placeholder={props.placeholder}
                onChange={props.onChange}
                icon={props.icon}
                onIconClick={props.onIconClick}
                extraClass={'mb-6'} 
              />
          )
      }
    </div>
  )
}

export default memo(FormInput, (prevProps, nextProps) => {
  if (nextProps.value !== prevProps.value) { return false }
  else { return true }
  /* исключаем перерендер компонента при введении данных в соседнем инпуте*/
});