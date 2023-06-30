import { LOADER_ANIMATION_TIME, STORAGE_KEY_PREFIX } from '../../constants/constants';
import {
  blockUserInteraction,
  unblockUserInteraction,
} from '../block-user-interaction-service/block-user-interaction-service';
import { saveAccessToken, saveRefreshToken, removeTokens } from './tokens-service';
import {
  requestLoginServer,
  requestLogoutServer,
  requestUpdateTokenServer,
  requestGetUserDataServer,
  requestChangeUserDataServer,
} from '../../utils/api';
import { Dispatch } from '@reduxjs/toolkit';
import {
  AuthActionsType,
  ResponseUpdateTokenType,
  ResponseLoginType,
  ResponseLogoutType,
  ResponseUserDataType,
} from '../../types/auth-types';
import { UserDataType, DispatchFuncType } from '../../types/types';

export const AUTH_REQUEST: AuthActionsType = 'AUTH_REQUEST';
export const AUTH_SUCCESS_LOGIN: AuthActionsType = 'AUTH_SUCCESS_LOGIN';
export const AUTH_SUCCESS_USER: AuthActionsType = 'AUTH_SUCCESS_USER';
export const AUTH_SUCCESS_UPDATE_TOKEN: AuthActionsType = 'AUTH_SUCCESS_UPDATE_TOKEN';
export const AUTH_SHOW_ERROR: AuthActionsType = 'AUTH_SHOW_ERROR';
export const AUTH_DEFAULT: AuthActionsType = 'AUTH_DEFAULT';
export const AUTH_HIDE_ERROR: AuthActionsType = 'AUTH_HIDE_ERROR';

/* сопоставляем номер ошибки из ответа сервера с номером ошибки, которую ищем */
export function matchNumErr(response: string, number: number): boolean {
  if (response && number) {
    return response.indexOf(number.toString()) !== -1;
  }
  return false;
}

export function deleteAuthData(): DispatchFuncType {
  return function (dispatch) {
    dispatch({ type: AUTH_DEFAULT, payload: {} });
    removeTokens();
  };
}

/* Запрос на обновление токена */
export function requestUpdateToken(request: DispatchFuncType): DispatchFuncType {
  return function (dispatch) {
    function handleError(response: string) {
      console.log(response);
      dispatch(handleAuthError(request));
    }

    dispatch({ type: AUTH_REQUEST, payload: {} });
    blockUserInteraction();

    requestUpdateTokenServer()
      .then((res: ResponseUpdateTokenType) => {
        if (typeof res === 'object' && res.success) {
          console.log(res);
          saveAccessToken(res.accessToken);
          saveRefreshToken(res.refreshToken);
          dispatch({ type: AUTH_SUCCESS_UPDATE_TOKEN, payload: {} });
          dispatch(request);
          setTimeout(() => {
            unblockUserInteraction();
          }, LOADER_ANIMATION_TIME);
        } else if (typeof res === 'string') {
          handleError(res);
        }
      })
      .catch((err: string) => {
        handleError(err);
      });
  };
}

/* Обрабатываем ошибку 401 */
export function handleAuthError(request: DispatchFuncType): DispatchFuncType {
  return function (dispatch) {
    const nameCountStorage: string = `${STORAGE_KEY_PREFIX}count-request-catch-error-401`;
    let countRequest: number = Number(sessionStorage.getItem(nameCountStorage));
    if (countRequest < 1 || !countRequest) {
      countRequest = 1;
    } else {
      countRequest = countRequest + 1;
    }
    if (countRequest > 3) {
      /* После трёх неудачных попыток удаляем данные об авторизации */
      sessionStorage.removeItem(nameCountStorage);
      dispatch({ type: AUTH_SHOW_ERROR, payload: {} });
      setTimeout(() => {
        dispatch({ type: AUTH_HIDE_ERROR, payload: {} });
        unblockUserInteraction();
        dispatch(deleteAuthData());
      }, 2000);
    } else {
      sessionStorage.setItem(nameCountStorage, countRequest.toString());
      dispatch(requestUpdateToken(request));
    }
  };
}

/* Запрос входа в аккаунт */
export function requestLogin(email: string, password: string): DispatchFuncType {
  return function (dispatch) {
    function handleError(response: string) {
      console.log(response);
      /* ловим ошибку "401", чтобы обновить токен и снова сделать запрос */
      if (matchNumErr(response, 401)) {
        dispatch(handleAuthError(requestLogin(email, password)));
      } else {
        dispatch({ type: AUTH_SHOW_ERROR, payload: {} });
        setTimeout(() => {
          unblockUserInteraction();
          dispatch(deleteAuthData());
        }, 2000);
      }
    }

    dispatch({ type: AUTH_REQUEST, payload: {} });
    blockUserInteraction();

    requestLoginServer(email, password)
      .then((res: ResponseLoginType) => {
        if (typeof res === 'object' && res.success) {
          saveAccessToken(res.accessToken);
          saveRefreshToken(res.refreshToken);
          dispatch({ type: AUTH_SUCCESS_LOGIN, payload: {} });
          dispatch({
            type: AUTH_SUCCESS_USER,
            payload: {
              user: {
                name: res.user.name,
                email: res.user.email,
              },
            },
          });
          setTimeout(() => {
            unblockUserInteraction();
          }, LOADER_ANIMATION_TIME);
        } else if (typeof res === 'string') {
          handleError(res);
        }
      })
      .catch((err: string) => {
        handleError(err);
      });
  };
}

/* Запрос выхода из аккаунта */
export function requestLogout(): DispatchFuncType {
  return function (dispatch) {
    function handleError(response: string) {
      console.log(response);
      /* ловим ошибку "401", чтобы обновить токен и снова сделать запрос */
      if (matchNumErr(response, 401)) {
        dispatch(handleAuthError(requestLogout()));
      } else {
        dispatch({ type: AUTH_SHOW_ERROR, payload: {} });
        setTimeout(() => {
          dispatch({ type: AUTH_HIDE_ERROR, payload: {} });
          unblockUserInteraction();
          dispatch(deleteAuthData());
        }, 2000);
      }
    }

    dispatch({ type: AUTH_REQUEST, payload: {} });
    blockUserInteraction();

    requestLogoutServer()
      .then((res: ResponseLogoutType) => {
        if (typeof res === 'object' && res.success) {
          setTimeout(() => {
            dispatch(deleteAuthData());
            unblockUserInteraction();
          }, LOADER_ANIMATION_TIME);
        } else if (typeof res === 'string') {
          handleError(res);
        }
      })
      .catch((err: string) => {
        handleError(err);
      });
  };
}

/* Запрос на получение данных о пользователе */
export function requestGetUserData(): DispatchFuncType {
  return function (dispatch) {
    function handleError(response: string) {
      console.log(response);
      /* ловим ошибку "401", чтобы обновить токен и снова сделать запрос */
      if (matchNumErr(response, 401)) {
        dispatch(handleAuthError(requestGetUserData()));
      } else {
        dispatch({ type: AUTH_SHOW_ERROR, payload: {} });
        setTimeout(() => {
          dispatch({ type: AUTH_HIDE_ERROR, payload: {} });
          unblockUserInteraction();
        }, 2000);
      }
    }

    dispatch({ type: AUTH_REQUEST, payload: {} });
    blockUserInteraction();

    requestGetUserDataServer()
      .then((res: ResponseUserDataType) => {
        if (typeof res === 'object' && res.success) {
          dispatch({
            type: AUTH_SUCCESS_USER,
            payload: {
              user: {
                name: res.user.name,
                email: res.user.email,
              },
            },
          });
          setTimeout(() => {
            unblockUserInteraction();
          }, LOADER_ANIMATION_TIME);
        } else if (typeof res === 'string') {
          handleError(res);
        }
      })
      .catch((err: string) => {
        handleError(err);
      });
  };
}

/* Запрос на изменение данных о пользователе */
export function requestChangeUserData(
  user: UserDataType,
  setInputsData: (data: UserDataType) => void
): DispatchFuncType {
  return function (dispatch) {
    function handleError(response: string) {
      console.log(response);
      /* ловим ошибку "401", чтобы обновить токен и снова сделать запрос */
      if (matchNumErr(response, 401)) {
        dispatch(handleAuthError(requestChangeUserData(user, setInputsData)));
      } else {
        dispatch({ type: AUTH_SHOW_ERROR, payload: {} });
        setTimeout(() => {
          dispatch({ type: AUTH_HIDE_ERROR, payload: {} });
          unblockUserInteraction();
        }, 2000);
      }
    }

    dispatch({ type: AUTH_REQUEST, payload: {} });
    blockUserInteraction();

    requestChangeUserDataServer(user)
      .then((res: ResponseUserDataType) => {
        if (typeof res === 'object' && res.success) {
          dispatch({
            type: AUTH_SUCCESS_USER,
            payload: {
              user: {
                name: res.user.name,
                email: res.user.email,
              },
            },
          });
          setInputsData({
            name: res.user.name,
            email: res.user.email,
            password: '',
          });
          setTimeout(() => {
            unblockUserInteraction();
          }, LOADER_ANIMATION_TIME);
        } else if (typeof res === 'string') {
          handleError(res);
        }
      })
      .catch((err: string) => {
        handleError(err);
      });
  };
}
