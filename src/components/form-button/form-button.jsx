import formButtonStyles from './form-button.module.css';
import { memo } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';


const FormButton = ({ text, ...otherProps }) => {

  return (
    <>
      <div className={formButtonStyles.box}>
        <Button
          {...otherProps}
          htmlType="submit"
          type="primary"
          size="medium"
        >
          {text}
        </Button>
      </div>
    </>
  )
}

export default memo(FormButton);

FormButton.propTypes = {
  text: PropTypes.string.isRequired
};