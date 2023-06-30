import { UserType, LoadingStateType, TokensType } from '../types/types';

export type AuthActionsType =
  | 'AUTH_REQUEST'
  | 'AUTH_SUCCESS_LOGIN'
  | 'AUTH_SUCCESS_USER'
  | 'AUTH_SUCCESS_UPDATE_TOKEN'
  | 'AUTH_SHOW_ERROR'
  | 'AUTH_DEFAULT'
  | 'AUTH_HIDE_ERROR';

export type AuthStateType = LoadingStateType & {
  user: UserType;
};

export type AuthDispatchActionType = {
  type: AuthActionsType;
  payload: { user: UserType };
};

// Запрос на обновление токенов
type SuccessUpdateTokenType = TokensType;
export type ResponseUpdateTokenType = SuccessUpdateTokenType | string;

// Запрос на авторизацию
type SuccessLoginType = TokensType & {
  user: UserType;
};
export type ResponseLoginType = SuccessLoginType | string;

// Запрос на разлогирование
type SuccessLogoutType = {
  success: true;
  message: string;
};
export type ResponseLogoutType = SuccessLogoutType | string;

// Запрос на получение/изменение данных о пользователе
type SuccessUserDataType = {
  success: true;
  user: UserType;
};
export type ResponseUserDataType = SuccessUserDataType | string;
