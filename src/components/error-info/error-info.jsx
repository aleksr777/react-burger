import stylesErrorInfo from './error-info.module.css';
import PropTypes from 'prop-types';
import ImgPath from '../../images/ban.svg';

const ErrorInfo = ({ title }) => {
  return (
    <div className={stylesErrorInfo.container}>
      <div className={stylesErrorInfo.textBox}>
        <p className={stylesErrorInfo.title}>
          {title}
        </p>
      </div>
      <picture className={stylesErrorInfo.imageBox}>
        <img className={stylesErrorInfo.image} src={ImgPath} alt="Ошибка." />
      </picture>
    </div>
  );
};

ErrorInfo.propTypes = {
  title: PropTypes.string.isRequired
};

export default ErrorInfo;
