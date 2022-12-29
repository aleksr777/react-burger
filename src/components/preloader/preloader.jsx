import preloaderStyles from './preloader.module.css';
import loaderImgPath from '../../images/loader.gif';

const Preloader = () => {

  return (
    <div className={preloaderStyles.overlay} >
      <picture className={preloaderStyles.picture}>
        <img className={preloaderStyles.picture__img} src={loaderImgPath} alt="Загрузка с сервера." />
      </picture>
    </div>
  )
};

export default Preloader;
