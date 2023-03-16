import formLinkStyles from './form-link.module.css';
import { Link } from 'react-router-dom';
import { memo } from 'react';

const FormLink = ({ children, linkPath }) => {
  return (
    <Link to={linkPath} className={formLinkStyles.link}>{children}</Link>
  )
}

export default memo(FormLink);