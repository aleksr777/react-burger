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
  if (nextProps.children[0] !== prevProps.children[0]
    && nextProps.children[1] !== prevProps.children[1]) { return false }
  else { return true }
});

FormText.propTypes = {
  children: PropTypes.node.isRequired
};