import stylesErrorInfo from './error-info.module.css';
import PropTypes from 'prop-types';
import ImgPath from '../../images/ban.svg';

const ErrorInfo = ({ title, message }) => {
  return (
    <div className={stylesErrorInfo.container}>
      <div className={stylesErrorInfo.textBox}>
        <p className={`text text_type_main-large ${stylesErrorInfo.title}`}>
          {title}
        </p>
        <p className={`text text_type_main-medium ${stylesErrorInfo.message}`}>
          {message}
        </p>
      </div>
      <picture className={stylesErrorInfo.imageBox}>
        <img className={stylesErrorInfo.image} src={ImgPath} alt="Ошибка." />
      </picture>
    </div>
  );
};

ErrorInfo.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

export default ErrorInfo;
