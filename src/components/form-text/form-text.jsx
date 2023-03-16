import formTextStyles from './form-text.module.css';
import { memo } from 'react';

const FormText = ({ children }) => {
  return (
    <p className={formTextStyles.text}>{children}</p>
  )
}

export default memo(FormText, (prevProps, nextProps) => {
  if (nextProps.children[0] !== prevProps.children[0] && nextProps.children[1] !== prevProps.children[1]) { return false }
  else { return true }
});