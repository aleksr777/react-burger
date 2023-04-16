import stylesLoader from './loader.module.css';
import PropTypes from 'prop-types';
import { LoaderSvg } from './loader.svg';
import ImgPath from '../../images/ban.svg';
import { bodySelector } from '../../constants/constants';
import { LOADER_ANIMATION_TIME } from '../../constants/constants';
import { CSSTransition } from 'react-transition-group';
import { useState, useEffect, useRef } from 'react';


const loaderAnimation = {
  enterActive: stylesLoader.enterActive,
  exitActive: stylesLoader.exitActive,
};


const Loader = ({ size, isLoading, isError, errorMessage }) => {


  const loaderRef = useRef();

  /* Этот стейт нужен для запуска анимации */
  const [animationIn, setAnimationIn] = useState(false);

  /* Этот стейт нужен, чтобы сообщение об ошибке сервера не закрывалось раньше лоадера*/
  const [errorState, setErrorState] = useState({
    isError: false,
    errorMessage: errorMessage,
  });

  /* Этот стейт нужен, чтобы анимация успела сработать до закрытия лоадера */
  const [isMounted, setMounted] = useState(false);


  useEffect(() => {
    if (isLoading && !isMounted) {
      setMounted(true);
    }
    else if (!isLoading && isMounted) {
      setTimeout(() => {
        setMounted(false);
      }, LOADER_ANIMATION_TIME);
    }
  }, [isLoading]);


  useEffect(() => {
    if (!isError) {
      setTimeout(() => {
        setErrorState({
          ...errorState,
          isError: false,
        })
      }, LOADER_ANIMATION_TIME);
    }
    else if (isError) {
      setErrorState({
        ...errorState,
        isError: true,
        errorMessage: errorMessage,
      });
    }
  }, [isError]);


  useEffect(() => {
    if (isMounted) {
      setAnimationIn(true)
    }
    if (!isLoading) {
      setAnimationIn(false)
    }
  }, [isLoading, isMounted]);

  /* На время запроса к серверу отключаем взаимодействие с пользователем (клики мышью)*/
  useEffect(() => {
    if (isLoading) {
      bodySelector.style.pointerEvents = 'none';
      bodySelector.style.userSelect = 'none';
    }
    if (!isLoading && !isMounted) {
      bodySelector.style.pointerEvents = '';
      bodySelector.style.userSelect = '';
    }
  }, [isLoading, isMounted]);

  if (!isMounted) {
    return null
  };

  return (
    <CSSTransition
      in={animationIn}
      nodeRef={loaderRef}
      timeout={LOADER_ANIMATION_TIME}
      mountOnEnter
      unmountOnExit
      classNames={loaderAnimation}
    >
      <div className={stylesLoader.overlay} ref={loaderRef}>
        <div className={stylesLoader.wrapper}>
          {!errorState.isError
            ? <LoaderSvg color={'#fff'} size={size} isLoading={isLoading}/>
            : (
              <div className={stylesLoader.container}>
                <div className={stylesLoader.textBox}>
                  <p className={`text text_type_main-large ${stylesLoader.text}`}>
                    Ошибка сервера
                  </p>
                  <p className={`text text_type_main-medium ${stylesLoader.textMessage}`}>
                    [{errorState.errorMessage}]
                  </p>
                </div>
                <div className={stylesLoader.pictureBox}>
                  <picture className={stylesLoader.imageBox}>
                    <img className={stylesLoader.image} src={ImgPath} alt="Страница не найдена" />
                  </picture>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </CSSTransition>
  );
};

Loader.propTypes = {
  size: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
};

export default Loader;