import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { checkAuth } from '../../services/authorization/check-auth'
import { deleteAuthData } from '../../services/authorization/auth-actions'
import { getAuthState } from '../../utils/selectors'

type Props = {
  children: React.ReactNode
  forUnauthUser: boolean
}


const ProtectedRouteElement = ( { children, forUnauthUser }: Props ) => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const fromPage: string = location.state || '/'

  const { isSuccess, user } = useAppSelector( getAuthState )

  let isAuth: boolean = checkAuth( isSuccess, user.email )

  useEffect( () => {
    if ( !isAuth ) {
      dispatch( deleteAuthData() )
    }
  }, [ isAuth, isSuccess, user ] )

  useEffect( () => {
    if ( !isAuth && !forUnauthUser ) {
      return navigate( '/login', { state: location.pathname } )
    }
    else if ( isAuth && forUnauthUser ) {
      return navigate( fromPage, { replace: true } )
    }
  }, [ isAuth, forUnauthUser, isSuccess, user ] )

  return (
    <>
      { ( ( isAuth && !forUnauthUser ) || ( !isAuth && forUnauthUser ) ) && children }
    </>
  )
}

export default ProtectedRouteElement
