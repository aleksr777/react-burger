import { LoadingStateType } from './types';

export type ResetPasswordActionsType =
  | 'RESET_PASSWORD_REQUEST'
  | 'RESET_PASSWORD_SUCCESS'
  | 'RESET_PASSWORD_ERROR'
  | 'RESET_PASSWORD_SET_DEFAULT';

export type ResetPasswordDispatchActionType = {
  type: ResetPasswordActionsType;
  payload: LoadingStateType;
};

type SuccessResetPassword = {
  success: boolean;
  message: string;
};
type ErrResetPassword = string;
export type ResetPasswordType = SuccessResetPassword | ErrResetPassword;
