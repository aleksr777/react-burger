import { DispatchFuncType } from '../../types/types'
import { RegisterUserType, RegisterUserActionsType } from '../../types/register-user-types'
import { LOADER_ANIMATION_TIME } from '../../constants/constants'
import { saveAccessToken, saveRefreshToken } from '../authorization/tokens-service'
import { registerUserRequestServer } from '../../utils/api'
import {
  blockUserInteraction,
  unblockUserInteraction,
} from '../block-user-interaction-service/block-user-interaction-service'
import { AUTH_SUCCESS_LOGIN, AUTH_SUCCESS_USER } from '../authorization/auth-actions'

export const REGISTER_USER_REQUEST: RegisterUserActionsType = 'REGISTER_USER_REQUEST'
export const REGISTER_USER_SUCCESS: RegisterUserActionsType = 'REGISTER_USER_SUCCESS'
export const REGISTER_USER_ERROR: RegisterUserActionsType = 'REGISTER_USER_ERROR'
export const REGISTER_USER_SET_DEFAULT_STATE: RegisterUserActionsType = 'REGISTER_USER_SET_DEFAULT_STATE'

export function registerUserRequest (
  valueName: string,
  valueEmail: string,
  valuePassword: string
): DispatchFuncType {

  return function ( dispatch ) {

    function handleError ( response: string ) {
      console.log( response )
      dispatch( { type: REGISTER_USER_ERROR, payload: {} } )
      setTimeout( () => {
        unblockUserInteraction()
        dispatch( { type: REGISTER_USER_SET_DEFAULT_STATE, payload: {} } )
      }, 2000 )
    }

    dispatch( { type: REGISTER_USER_REQUEST, payload: {} } )
    blockUserInteraction()

    registerUserRequestServer( valueName, valueEmail, valuePassword )
      .then( ( res: RegisterUserType ) => {
        if ( typeof res === 'object' && res.success ) {
          dispatch( { type: REGISTER_USER_SUCCESS, payload: {} } )
          saveAccessToken( res.accessToken )
          saveRefreshToken( res.refreshToken )
          dispatch( { type: AUTH_SUCCESS_LOGIN, payload: {} } )
          dispatch( {
            type: AUTH_SUCCESS_USER,
            payload: {
              user: {
                name: res.user.name,
                email: res.user.email,
                password: valuePassword,
              },
            },
          } )
          setTimeout( () => {
            unblockUserInteraction()
            dispatch( { type: REGISTER_USER_SET_DEFAULT_STATE, payload: {} } )
          }, LOADER_ANIMATION_TIME )
        } else if ( typeof res === 'string' ) {
          handleError( res )
        }
      } )
      .catch( ( err: string ) => handleError( err ) )
  }
}
