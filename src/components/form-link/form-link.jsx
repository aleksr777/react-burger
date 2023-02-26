import formLinkStyles from './form-link.module.css';
import { Link } from 'react-router-dom';
import { memo } from 'react';

const FormLink = ({ text, linkPath, linkText }) => {
  return (
    <p className={formLinkStyles.text}>
      {text}<Link to={linkPath} className={formLinkStyles.link}>{linkText}</Link>
    </p>
  )
}

export default memo(FormLink);