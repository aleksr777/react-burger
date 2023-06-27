import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { checkAuth } from '../../services/authorization/check-auth'
import { deleteAuthData } from '../../services/authorization/auth-actions'
import { getAuthState } from '../../utils/selectors'
import { AuthStateType } from '../../types/types'

type Props = {
  children: React.ReactNode
  forUnauthUser: boolean
}


const ProtectedRouteElement = ( { children, forUnauthUser }: Props ) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const fromPage: string = location.state || '/'

  const { isSuccess, user }: AuthStateType = useSelector( getAuthState )

  let isAuth: boolean = checkAuth( isSuccess, user.email )

  useEffect( () => {
    if ( !isAuth ) {
      dispatch( deleteAuthData() as any )
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
