import formButtonStyles from './form-button.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { resetEmailRequest } from '../../services/actions/reset-email-actions';

const FormButton = ({ text, valueEmail }) => {

  const dispatch = useDispatch();

  function sendResetEmailRequest() {
    dispatch(resetEmailRequest(valueEmail));
    console.log(valueEmail)
  }

  return (
    <div className={formButtonStyles.box}>
      <Button onClick={sendResetEmailRequest} htmlType="button" type="primary" size="medium">
        {text}
      </Button>
    </div>
  )
}

export default memo(FormButton);