import { TokensType, UserType } from './types';

export type RegisterUserActionsType =
  | 'REGISTER_USER_REQUEST'
  | 'REGISTER_USER_SUCCESS'
  | 'REGISTER_USER_ERROR'
  | 'REGISTER_USER_SET_DEFAULT_STATE';

type SuccessRegisterUser = TokensType & {
  user: UserType;
};
export type RegisterUserType = SuccessRegisterUser | string;

export type RegisterUserDispatchActionType = {
  type: RegisterUserActionsType;
  payload: UserType & { password: string };
};
