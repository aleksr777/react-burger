import formTextStyles from './form-text.module.css';
import { memo } from 'react';

const FormText = ({ children }) => {
  return (
    <p className={formTextStyles.text}>{children}</p>
  )
}

export default memo(FormText);