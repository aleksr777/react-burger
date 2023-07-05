import { LoadingStateType, MessageObjType } from '../types/types'

export type ForgotPasswordActionsType =
  | 'FORGOT_PASSWORD_REQUEST'
  | 'FORGOT_PASSWORD_SUCCESS'
  | 'FORGOT_PASSWORD_ERROR'
  | 'FORGOT_PASSWORD_DEFAULT'

export type ForgotPasswordDispatchType = {
  type: ForgotPasswordActionsType
  payload: LoadingStateType
}

export type ForgotPasswordType = MessageObjType | string
