export type AuthActionType =
  | 'AUTH_REQUEST'
  | 'AUTH_SUCCESS_LOGIN'
  | 'AUTH_SUCCESS_USER'
  | 'AUTH_SUCCESS_UPDATE_TOKEN'
  | 'AUTH_SHOW_ERROR'
  | 'AUTH_DEFAULT'
  | 'AUTH_HIDE_ERROR';

// Запрос на обновление токенов
type SuccessUpdateTokenType = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};
type ErrUpdateTokenType = string;
export type ResponseUpdateTokenType = SuccessUpdateTokenType | ErrUpdateTokenType;

// Запрос на авторизацию
type SuccessLoginType = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: {
    name: string;
    email: string;
  };
};
type ErrLoginType = string;
export type ResponseLoginType = SuccessLoginType | ErrLoginType;

// Запрос на разлогирование
type SuccessLogoutType = {
  success: boolean;
  message: string;
};
type ErrLogoutType = string;
export type ResponseLogoutType = SuccessLogoutType | ErrLogoutType;

// Запрос на получение/изменение данных о пользователе
type SuccessUserDataType = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
};
type ErrUserDataType = string;
export type ResponseUserDataType = SuccessUserDataType | ErrUserDataType;
