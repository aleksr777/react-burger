import notFoundStyles from './not-found.module.css';
import { Link } from 'react-router-dom';
import ImgPath from '../../images/ban.svg';


const NotFound404 = () => {

  return (
    <div className={notFoundStyles.container}>
      <div className={notFoundStyles.textBox}>
        <p className={`text text_type_main-large ${notFoundStyles.text}`}>Упс... Страница не найдена!</p>
        <p className={`text text_type_digits-large ${notFoundStyles.text}`}>404 Error</p>
        <p className={`text text_type_main-medium ${notFoundStyles.text}`}>
          Проверьте адрес ссылки или перейдите на <Link to='/' className={notFoundStyles.link}>главную страницу</Link>
        </p>
      </div>
      <div className={notFoundStyles.pictureBox}>
        <picture className={notFoundStyles.imageBox}>
          <img className={notFoundStyles.image} src={ImgPath} alt="Страница не найдена" />
        </picture>
      </div>
    </div>
  );
};

export { NotFound404 };