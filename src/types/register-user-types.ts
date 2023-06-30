import { TokensType, UserType, UserObjType, PasswordObjType } from './types';

export type RegisterUserActionsType =
  | 'REGISTER_USER_REQUEST'
  | 'REGISTER_USER_SUCCESS'
  | 'REGISTER_USER_ERROR'
  | 'REGISTER_USER_SET_DEFAULT_STATE';

export type RegisterUserType = (TokensType & UserObjType) | string;

export type RegisterUserDispatchType = {
  type: RegisterUserActionsType;
  payload: UserType & PasswordObjType;
};
