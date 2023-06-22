import stylesLoader from './loader.module.css'
import { CSSTransition } from 'react-transition-group'
import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { LoaderSvg } from './loader-svg'
import { LOADER_ANIMATION_TIME } from '../../constants/constants'
import ErrorInfo from '../error-info/error-info'
import {
  IngredientsDataStateType,
  AuthStateType,
  OrderIdStateType,
  LoadingStateType,
  ProfileOrdersStateType,
  FeedOrdersStateType
} from '../../types/types'
import {
  getIngredientsDataState,
  getAuthState,
  getOrderIdState,
  getForgotPasswordState,
  getRegisterUserState,
  getResetPasswordState,
  getProfileOrdersState,
  getFeedOrdersState,
} from '../../utils/selectors'

const loaderAnimation = {
  enterActive: stylesLoader.enterActive,
  exitActive: stylesLoader.exitActive,
}


const Loader = () => {

  const loaderRef = useRef<HTMLDivElement>( null )

  const ingredientsDataState: IngredientsDataStateType = useSelector( getIngredientsDataState )
  const authState: AuthStateType = useSelector( getAuthState )
  const orderIdState: OrderIdStateType = useSelector( getOrderIdState )
  const forgotPasswordState: LoadingStateType = useSelector( getForgotPasswordState )
  const registerUserState: LoadingStateType = useSelector( getRegisterUserState )
  const resetPasswordState: LoadingStateType = useSelector( getResetPasswordState )
  const profileOrdersState: ProfileOrdersStateType = useSelector( getProfileOrdersState )
  const feedOrdersState: FeedOrdersStateType = useSelector( getFeedOrdersState )

  const [ isLoading, setIsLoading ] = useState<boolean>( false )
  const [ isError, setIsError ] = useState<boolean>( false )
  const [ animationIn, setAnimationIn ] = useState<boolean>( false )
  type ErrorState = { state: boolean; title: string }
  const [ errorState, setErrorState ] = useState<ErrorState>( {
    state: false,
    title: 'Ошибка сервера',
  } )
  const [ isMounted, setMounted ] = useState<boolean>( false )

  useEffect( () => {
    if (
      ingredientsDataState.isLoading ||
      authState.isLoading ||
      orderIdState.isLoading ||
      forgotPasswordState.isLoading ||
      registerUserState.isLoading ||
      resetPasswordState.isLoading ||
      profileOrdersState.isLoading ||
      feedOrdersState.isLoading
    ) {
      setIsLoading( true )
    } else {
      setIsLoading( false )
    }
  }, [
    ingredientsDataState.isLoading,
    authState.isLoading,
    orderIdState.isLoading,
    forgotPasswordState.isLoading,
    registerUserState.isLoading,
    resetPasswordState.isLoading,
    profileOrdersState.isLoading,
    feedOrdersState.isLoading,
  ] )

  useEffect( () => {
    if (
      ingredientsDataState.isError ||
      authState.isError ||
      orderIdState.isError ||
      forgotPasswordState.isError ||
      registerUserState.isError ||
      resetPasswordState.isError ||
      profileOrdersState.isError ||
      feedOrdersState.isError
    ) {
      setIsError( true )
    } else {
      setIsError( false )
    }
  }, [
    ingredientsDataState.isError,
    authState.isError,
    orderIdState.isError,
    forgotPasswordState.isError,
    registerUserState.isError,
    resetPasswordState.isError,
    profileOrdersState.isError,
    feedOrdersState.isError,
  ] )

  useEffect( () => {
    if ( isLoading && !isMounted ) {
      setMounted( true )
    } else if ( !isLoading && isMounted ) {
      setTimeout( () => {
        setMounted( false )
        setErrorState( {
          ...errorState,
          state: false,
        } )
      }, LOADER_ANIMATION_TIME )
    }
  }, [ isLoading ] )

  useEffect( () => {
    isMounted && setAnimationIn( true )
    !isLoading && setAnimationIn( false )
  }, [ isLoading, isMounted ] )

  useEffect( () => {
    if ( isError ) {
      setErrorState( {
        ...errorState,
        state: isError,
      } )
      if ( authState.isError ) {
        setErrorState( {
          ...errorState,
          state: isError,
          title: 'Ошибка авторизации',
        } )
      }
    }
  }, [ isError ] )

  if ( !isMounted ) {
    return null
  }

  return (
    <CSSTransition
      in={ animationIn }
      nodeRef={ loaderRef }
      timeout={ LOADER_ANIMATION_TIME }
      mountOnEnter
      unmountOnExit
      classNames={ loaderAnimation }
    >
      <div className={ stylesLoader.overlay } ref={ loaderRef }>
        { errorState.state && isMounted ? (
          <ErrorInfo title={ errorState.title } />
        ) : (
          <LoaderSvg color="#fff" size={ 100 } isLoading={ isLoading } />
        ) }
      </div>
    </CSSTransition>
  )
}

export default Loader
