import stylesLoader from './loader.module.css';
import PropTypes from 'prop-types';
import { LoaderSvg } from './loader.svg';
import { bodySelector } from '../../constants/constants';
import { LOADER_ANIMATION_TIME } from '../../constants/constants';
import { CSSTransition } from 'react-transition-group';
import { useState, useEffect, useRef } from 'react';

const loaderSizes = {
  small: 25,
  medium: 50,
  large: 100,
};

const loaderAnimation = {
  enterActive: stylesLoader.enterActive,
  exitActive: stylesLoader.exitActive,
};

const Loader = ({ size, isLoading }) => {

  const loaderRef = useRef();

  const [animationIn, setAnimationIn] = useState(false);
  function startAnimation() {
    /* без setTimeout почему-то не запускается анимация при монтировании*/
    setTimeout(() => setAnimationIn(isLoading), 0);
  }
  useEffect(() => startAnimation(), [isLoading]);

  /* Стейт isMounted нужен, чтобы анимация успела сработать до закрытия Loader */
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
    if (isMounted && isLoading) {
      bodySelector.style.pointerEvents = 'none';
      bodySelector.style.userSelect = 'none';
    }
    else if (!isMounted && !isLoading) {
      bodySelector.style.pointerEvents = '';
      bodySelector.style.userSelect = '';
    }
  }, [isMounted, isLoading]);

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
          <LoaderSvg color={'#fff'} size={loaderSizes[size]} />
        </div>
      </div>
    </CSSTransition>
  );
};

Loader.propTypes = {
  size: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Loader;