import stylesLoader from './loader.module.css';
import { CSSTransition } from 'react-transition-group';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { LoaderSvg } from './loader-svg';
import { LOADER_ANIMATION_TIME } from '../../constants/constants';
import ErrorInfo from '../../components/error-info/error-info';
import {
  getIngredientsDataState,
  getAuthState,
  getOrderIdState,
  getForgotPasswordState,
  getRegisterUserState,
  getResetPasswordState,
  getProfileOrdersState,
} from '../../utils/selectors';


const loaderAnimation = {
  enterActive: stylesLoader.enterActive,
  exitActive: stylesLoader.exitActive,
};


const Loader = () => {

  const loaderRef = useRef();

  const ingredientsDataState = useSelector(getIngredientsDataState);
  const authState = useSelector(getAuthState);
  const orderIdState = useSelector(getOrderIdState);
  const forgotPasswordState = useSelector(getForgotPasswordState);
  const registerUserState = useSelector(getRegisterUserState);
  const resetPasswordState = useSelector(getResetPasswordState);
  const profileOrdersState = useSelector(getProfileOrdersState);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  /* Этот стейт нужен для запуска анимации */
  const [animationIn, setAnimationIn] = useState(false);

  /* Этот стейт нужен, чтобы сообщение об ошибке не исчезало до конца анимации*/
  const [errorState, setErrorState] = useState({
    state: false,
    title: 'Ошибка сервера',
  });

  /* Этот стейт нужен, чтобы анимация успела сработать до закрытия лоадера */
  const [isMounted, setMounted] = useState(false);


  useEffect(() => {
    if (ingredientsDataState.isLoading ||
      authState.isLoading ||
      orderIdState.isLoading ||
      forgotPasswordState.isLoading ||
      registerUserState.isLoading ||
      resetPasswordState.isLoading ||
      profileOrdersState.isLoading) {
      setIsLoading(true)
    }
    else { setIsLoading(false) }
  },
    [ingredientsDataState.isLoading,
    authState.isLoading,
    orderIdState.isLoading,
    forgotPasswordState.isLoading,
    registerUserState.isLoading,
    resetPasswordState.isLoading,
    profileOrdersState.isLoading]);


  useEffect(() => {
    if (ingredientsDataState.isError ||
      authState.isError ||
      orderIdState.isError ||
      forgotPasswordState.isError ||
      registerUserState.isError ||
      resetPasswordState.isError ||
      profileOrdersState.isError) {
      setIsError(true)
    }
    else { setIsError(false) }
  },
    [ingredientsDataState.isError,
    authState.isError,
    orderIdState.isError,
    forgotPasswordState.isError,
    registerUserState.isError,
    resetPasswordState.isError,
    profileOrdersState.isError]);

  useEffect(() => {
    if (isLoading && !isMounted) {
      setMounted(true)
    }
    else if (!isLoading && isMounted) {
      setTimeout(() => {
        setMounted(false);
        setErrorState({
          ...errorState,
          state: false,
        });
      }, LOADER_ANIMATION_TIME);
    }
  }, [isLoading]);


  useEffect(() => {
    isMounted && setAnimationIn(true);
    !isLoading && setAnimationIn(false);
  }, [isLoading, isMounted]);

  useEffect(() => {
    if (isError) {
      setErrorState({
        ...errorState,
        state: isError,
      })
      if (authState.isError) {
        setErrorState({
          ...errorState,
          state: isError,
          title: 'Ошибка авторизации',
        });
      };
    }
  }, [isError]);


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
        {errorState.state && isMounted
          ? <ErrorInfo title={errorState.title} />
          : <LoaderSvg color={'#fff'} size={100} isLoading={isLoading} />
        }
      </div>
    </CSSTransition>
  );
};

export default Loader;
