import stylesNotFound from './not-found.module.css';
import { Link } from 'react-router-dom';
import ImgPath from '../../images/ban.svg';


const NotFoundPage = () => {

  return (
    <div className={stylesNotFound.container}>
      <div className={stylesNotFound.textBox}>
        <p className={`text text_type_main-large ${stylesNotFound.text}`}>Упс... Страница не найдена!</p>
        <p className={`text text_type_digits-large ${stylesNotFound.text}`}>404 Error</p>
        <p className={`text text_type_main-medium ${stylesNotFound.text}`}>
          Проверьте адрес ссылки
        </p>
        <p className={`text text_type_main-medium ${stylesNotFound.text}`}>
          или перейдите на <Link to='/' className={stylesNotFound.link}>главную страницу</Link>
        </p>
      </div>
      <div className={stylesNotFound.pictureBox}>
        <picture className={stylesNotFound.imageBox}>
          <img className={stylesNotFound.image} src={ImgPath} alt="Страница не найдена" />
        </picture>
      </div>
    </div>
  );
};

export default NotFoundPage;