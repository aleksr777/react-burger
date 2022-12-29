import preloaderStyles from './preloader.module.css';
import loaderImgPath from '../../images/loader.gif';
import ModalOverlay from '../modal-overlay/modal-overlay'

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
