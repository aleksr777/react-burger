import formTextStyles from './form-text.module.css';
import PropTypes from 'prop-types';
import { memo } from 'react';

const FormText = ({ children }) => {
  return (
    <p className={formTextStyles.text}>{children}</p>
  )
}

export default memo(FormText, (prevProps, nextProps) => {
  /* Отключаем перерендер компонента */
  if (nextProps.children !== prevProps.children) { return false }
  else { return true }
});

FormText.propTypes = {
  children: PropTypes.node.isRequired
};