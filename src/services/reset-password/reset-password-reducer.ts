import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_SET_DEFAULT,
} from './reset-password-actions'
import { LoadingStateType } from '../../types/types'
import { ResetPasswordDispatchType } from '../../types/reset-password-types'

const defaultState: LoadingStateType = {
  isSuccess: false,
  isLoading: false,
  isError: false,
}

const resetPasswordReducer = (
  state: LoadingStateType = defaultState,
  action: ResetPasswordDispatchType
) => {
  switch ( action.type ) {
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false,
      }

    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        isError: true,
      }

    case RESET_PASSWORD_SET_DEFAULT:
      return defaultState

    default:
      return state
  }
}

export { resetPasswordReducer }
