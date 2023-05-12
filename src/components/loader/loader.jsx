import stylesLoader from './loader.module.css';
import { CSSTransition } from 'react-transition-group';
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { LoaderSvg } from './loader.svg';
import { LOADER_ANIMATION_TIME } from '../../constants/constants';
import ErrorInfo from '../../components/error-info/error-info';


const loaderAnimation = {
  enterActive: stylesLoader.enterActive,
  exitActive: stylesLoader.exitActive,
};


const Loader = ({ size, isLoading, isError }) => {

  const loaderRef = useRef();

  /* Этот стейт нужен для запуска анимации */
  const [animationIn, setAnimationIn] = useState(false);

  /* Этот стейт нужен, чтобы сообщение об ошибке сервера не закрывалось раньше лоадера*/
  const [errorState, setErrorState] = useState({
    state: false,
    title: '',
    message: '',
  });

  /* Этот стейт нужен, чтобы анимация успела сработать до закрытия лоадера */
  const [isMounted, setMounted] = useState(false);


  useEffect(() => {
    if (isLoading && !isMounted) { setMounted(true) }
    else if (!isLoading && isMounted) {
      setTimeout(() => {
        setMounted(false);
        setErrorState({
          state: false,
          title: '',
          message: '',
        });
      }, LOADER_ANIMATION_TIME);
    }
  }, [isLoading]);


  useEffect(() => {
    isMounted && setAnimationIn(true);
    !isLoading && setAnimationIn(false);
  }, [isLoading, isMounted]);


  useEffect(() => {
    isError.state && setErrorState(isError);
  }, [isError.state]);


  /* Закрываем лоадер после срабатывания анимации */
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
          {errorState.state && isMounted
            ? <ErrorInfo title={errorState.title} message={errorState.message} />
            : <LoaderSvg color={'#fff'} size={size} isLoading={isLoading} />
          }
        </div>
      </div>
    </CSSTransition>
  );
};

export default Loader;

Loader.propTypes = {
  size: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.shape({
    state: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  }).isRequired
};
