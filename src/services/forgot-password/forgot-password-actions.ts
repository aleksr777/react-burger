import { DispatchFuncType } from '../../types/types'
import { ForgotPasswordType, ForgotPasswordActionsType } from '../../types/forgot-password-types'
import { LOADER_ANIMATION_TIME } from '../../constants/constants'
import { forgotPasswordRequestServer } from '../../utils/api'
import {
  blockUserInteraction,
  unblockUserInteraction,
} from '../block-user-interaction-service/block-user-interaction-service'

export const FORGOT_PASSWORD_REQUEST: ForgotPasswordActionsType = 'FORGOT_PASSWORD_REQUEST'
export const FORGOT_PASSWORD_SUCCESS: ForgotPasswordActionsType = 'FORGOT_PASSWORD_SUCCESS'
export const FORGOT_PASSWORD_ERROR: ForgotPasswordActionsType = 'FORGOT_PASSWORD_ERROR'
export const FORGOT_PASSWORD_DEFAULT: ForgotPasswordActionsType = 'FORGOT_PASSWORD_DEFAULT'

export function forgotPasswordRequest (
  goToResetPasswordPage: () => void,
  valueEmail: string
): DispatchFuncType {
  return function ( dispatch ) {
    function handleError ( response: string ) {
      console.log( response )
      dispatch( { type: FORGOT_PASSWORD_ERROR, payload: {} } )
      setTimeout( () => {
        unblockUserInteraction()
        dispatch( { type: FORGOT_PASSWORD_DEFAULT, payload: {} } )
      }, 2000 )
    }

    dispatch( { type: FORGOT_PASSWORD_REQUEST, payload: {} } )
    blockUserInteraction()

    forgotPasswordRequestServer( valueEmail )
      .then( ( res: ForgotPasswordType ) => {
        if ( typeof res === 'object' && res.success ) {
          dispatch( { type: FORGOT_PASSWORD_SUCCESS, payload: {} } )
          setTimeout( () => {
            goToResetPasswordPage()
            unblockUserInteraction()
          }, LOADER_ANIMATION_TIME )
        } else if ( typeof res === 'string' ) {
          handleError( res )
        }
      } )
      .catch( ( err: string ) => handleError( err ) )
  }
}
