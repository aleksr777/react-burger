import { LoadingStateType, UserType } from './types';

export type RegisterUserActionsType =
  | 'REGISTER_USER_REQUEST'
  | 'REGISTER_USER_SUCCESS'
  | 'REGISTER_USER_ERROR'
  | 'REGISTER_USER_SET_DEFAULT_STATE';

type SuccessRegisterUser = {
  success: true;
  user: UserType;
  accessToken: string;
  refreshToken: string;
};
type ErrRegisterUser = string;
export type RegisterUserType = SuccessRegisterUser | ErrRegisterUser;

export type RegisterUserDispatchActionType = {
  type: RegisterUserActionsType;
  payload: UserType & { password: string };
};
