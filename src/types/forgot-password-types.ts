import { LoadingStateType } from '../types/types';

export type ForgotPasswordActionsType =
  | 'FORGOT_PASSWORD_REQUEST'
  | 'FORGOT_PASSWORD_SUCCESS'
  | 'FORGOT_PASSWORD_ERROR'
  | 'FORGOT_PASSWORD_DEFAULT';

export type ForgotPasswordDispatchActionType = {
  type: ForgotPasswordActionsType;
  payload: LoadingStateType;
};

type SuccessForgotPassword = {
  success: true;
  message: string;
};
export type ForgotPasswordType = SuccessForgotPassword | string;
