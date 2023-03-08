import formButtonStyles from './form-button.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { memo } from 'react';


const FormButton = ({ text }) => {

  return (
    <>
      <div className={formButtonStyles.box}>
        <Button htmlType="submit" type="primary" size="medium">
          {text}
        </Button>
      </div>
    </>
  )
}

export default memo(FormButton);