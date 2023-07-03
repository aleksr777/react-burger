import { LoadingStateType, TokensType, MessageObjType, UserObjType } from '../types/types';

export type AuthActionsType =
  | 'AUTH_REQUEST'
  | 'AUTH_SUCCESS_LOGIN'
  | 'AUTH_SUCCESS_USER'
  | 'AUTH_SUCCESS_UPDATE_TOKEN'
  | 'AUTH_SHOW_ERROR'
  | 'AUTH_DEFAULT'
  | 'AUTH_HIDE_ERROR';

export type AuthStateType = LoadingStateType & UserObjType;

export type AuthDispatchType = {
  type: AuthActionsType;
  payload: UserObjType;
};

// Запрос на обновление токенов
export type ResponseUpdateTokenType = TokensType | string;

// Запрос на авторизацию
export type ResponseLoginType = (TokensType & UserObjType) | string;

// Запрос на разлогирование
export type ResponseLogoutType = MessageObjType | string;

// Запрос на получение/изменение данных о пользователе
export type ResponseUserDataType = ({ success: true } & UserObjType) | string;
