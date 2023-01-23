import preloaderStyles from './preloader.module.css';
import loaderImgPath from './preloader.gif';

const Preloader = () => {

  return (
    <div className={preloaderStyles.overlay} >
      <picture className={preloaderStyles.picture}>
        <img className={preloaderStyles.picture__img} src={loaderImgPath} alt="Иконка загрузки с сервера." />
      </picture>
    </div>
  )
};

export default Preloader;
