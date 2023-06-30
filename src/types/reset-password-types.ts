import { LoadingStateType, MessageObjType } from './types';

export type ResetPasswordActionsType =
  | 'RESET_PASSWORD_REQUEST'
  | 'RESET_PASSWORD_SUCCESS'
  | 'RESET_PASSWORD_ERROR'
  | 'RESET_PASSWORD_SET_DEFAULT';

export type ResetPasswordDispatchType = {
  type: ResetPasswordActionsType;
  payload: LoadingStateType;
};

export type ResetPasswordType = MessageObjType | string;
