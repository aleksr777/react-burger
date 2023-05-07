import formTitleStyles from './form-title.module.css';
import { memo } from 'react';
import PropTypes from 'prop-types';

const FormTitle = ({ text }) => {
  return (
    <h1 className={formTitleStyles.text}>{text}</h1>
  )
}

export default memo(FormTitle);

FormTitle.propTypes = {
  text: PropTypes.string.isRequired
};