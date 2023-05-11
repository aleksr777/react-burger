import {
  LOADER_ANIMATION_TIME,
  STORAGE_KEY_PREFIX,
} from '../../constants/constants';
import {
  blockUserInteraction,
  unblockUserInteraction,
} from '../block-user-interaction-service/block-user-interaction-service';
import {
  saveAccessToken,
  saveRefreshToken,
  removeTokens,
} from './tokens-service';
import {
  requestLoginServer,
  requestLogoutServer,
  requestUpdateTokenServer,
  requestGetUserDataServer,
  requestChangeUserDataServer,
} from '../../utils/api';
export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS_LOGIN = 'AUTH_SUCCESS_LOGIN';
export const AUTH_SUCCESS_USER = 'AUTH_SUCCESS_USER';
export const AUTH_SUCCESS_UPDATE_TOKEN = 'AUTH_SUCCESS_UPDATE_TOKEN';
export const AUTH_SHOW_ERROR = 'AUTH_SHOW_ERROR';
export const AUTH_DEFAULT = 'AUTH_DEFAULT';
export const AUTH_HIDE_ERROR = 'AUTH_HIDE_ERROR';


/* сопоставляем номер ошибки из ответа сервера с номером ошибки, которую ищем */
export function matchNumErr(response, number) {
  return response.indexOf(parseInt(number)) !== -1 ? true : false;
}

export function deleteAuthData() {
  return function (dispatch) {
    dispatch({ type: AUTH_DEFAULT, payload: {} });
    removeTokens();
  }
}


/* Обрабатываем ошибку 401 */
export function handleAuthError(response, request) {
  return function (dispatch) {

    const nameCountStorage = `${STORAGE_KEY_PREFIX}count-request-catch-error-401`;
    let countRequest = Number(sessionStorage.getItem(nameCountStorage));

    (countRequest < 1 || !countRequest) ? countRequest = 1 : countRequest = ++countRequest;

    if (countRequest > 3) {
      /* После трёх неудачных попыток удаляем данные об авторизации */
      sessionStorage.removeItem(nameCountStorage);
      dispatch({
        type: AUTH_SHOW_ERROR,
        payload: {
          message: response,
          title: 'Ошибка авторизации',
        }
      });
      setTimeout(() => {
        dispatch({ type: AUTH_HIDE_ERROR, payload: {} });
        unblockUserInteraction();
        dispatch(deleteAuthData());
      }, 1500);
    }
    else {
      sessionStorage.setItem(nameCountStorage, countRequest);
      dispatch(requestUpdateToken(request));
    };
  }
};


/* Запрос на обновление токена */
export function requestUpdateToken(repeatRequest) {
  return function (dispatch) {

    dispatch({ type: AUTH_REQUEST, payload: {} });

    blockUserInteraction();

    requestUpdateTokenServer()
      .then(res => {
        if (res && res.success) {
          saveAccessToken(res.accessToken);
          saveRefreshToken(res.refreshToken);
          dispatch({ type: AUTH_SUCCESS_UPDATE_TOKEN, payload: {} });
          dispatch(repeatRequest);
          setTimeout(() => { unblockUserInteraction() }, LOADER_ANIMATION_TIME);
        }
        else {
          unblockUserInteraction();
          console.log(res);
        };
      })
      .catch(err => {
        unblockUserInteraction();
        console.log(err);
      });
  };
};


/* Запрос входа в аккаунт */
export function requestLogin(email, password) {

  return function (dispatch) {

    function handleError(response) {
      console.log(response);
      /* ловим ошибку "401", чтобы обновить токен и снова сделать запрос */
      if (matchNumErr(response, 401)) {
        dispatch(handleAuthError(response, requestLogin(email, password)));
      }
      else {
        dispatch({
          type: AUTH_SHOW_ERROR,
          payload: {
            message: response,
            title: 'Ошибка авторизации',
          }
        });
        setTimeout(() => {
          unblockUserInteraction();
          dispatch(deleteAuthData())
        }, 1500);
      }
    };

    dispatch({ type: AUTH_REQUEST, payload: {} });
    blockUserInteraction();

    requestLoginServer(email, password)
      .then(res => {
        if (res && res.success) {
          saveAccessToken(res.accessToken);
          saveRefreshToken(res.refreshToken);
          dispatch({ type: AUTH_SUCCESS_LOGIN, payload: {} });
          dispatch({
            type: AUTH_SUCCESS_USER, payload: {
              user: {
                name: res.user.name,
                email: res.user.email
              },
            }
          });
          setTimeout(() => { unblockUserInteraction() }, LOADER_ANIMATION_TIME);
        }
        else {
          handleError(res);
        };
      })
      .catch(err => {
        handleError(err);
      });
  };
};


/* Запрос выхода из аккаунта */
export function requestLogout() {

  return function (dispatch) {

    function handleError(response) {
      console.log(response);
      /* ловим ошибку "401", чтобы обновить токен и снова сделать запрос */
      if (matchNumErr(response, 401)) {
        dispatch(handleAuthError(response, requestLogout()));
      }
      else {
        dispatch({
          type: AUTH_SHOW_ERROR,
          payload: {
            message: response,
            title: 'Ошибка сервера',
          }
        });
        setTimeout(() => {
          dispatch({ type: AUTH_HIDE_ERROR, payload: {} });
          unblockUserInteraction();
          dispatch(deleteAuthData());
        }, 1500);
      }
    };

    dispatch({ type: AUTH_REQUEST, payload: {} });
    blockUserInteraction();

    requestLogoutServer()
      .then(res => {
        if (res && res.success) {
          setTimeout(() => {
            dispatch(deleteAuthData());
            unblockUserInteraction();
          }, LOADER_ANIMATION_TIME);
        }
        else {
          handleError(res);
        };
      })
      .catch(err => {
        handleError(err);
      });
  };
};


/* Запрос на получение данных о пользователе */
export function requestGetUserData() {

  return function (dispatch) {

    function handleError(response) {
      console.log(response);
      /* ловим ошибку "401", чтобы обновить токен и снова сделать запрос */
      if (matchNumErr(response, 401)) {
        dispatch(handleAuthError(response, requestGetUserData()));
      }
      else {
        dispatch({
          type: AUTH_SHOW_ERROR,
          payload: {
            message: response,
            title: 'Ошибка сервера',
          }
        });
        setTimeout(() => {
          dispatch({ type: AUTH_HIDE_ERROR, payload: {} });
          unblockUserInteraction();
        }, 1500);
      }
    };

    dispatch({ type: AUTH_REQUEST, payload: {} });
    blockUserInteraction();

    requestGetUserDataServer()
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: AUTH_SUCCESS_USER, payload: {
              user: {
                name: res.user.name,
                email: res.user.email
              },
            }
          });
          setTimeout(() => { unblockUserInteraction() }, LOADER_ANIMATION_TIME);
        }
        else {
          handleError(res);
        };
      })
      .catch(err => {
        handleError(err);
      });
  };
};


/* Запрос на изменение данных о пользователе */
export function requestChangeUserData(user, setInputsData) {

  return function (dispatch) {

    function handleError(response) {
      console.log(response);
      /* ловим ошибку "401", чтобы обновить токен и снова сделать запрос */
      if (matchNumErr(response, 401)) {
        dispatch(handleAuthError(response, requestChangeUserData(user, setInputsData)));
      }
      else {
        dispatch({
          type: AUTH_SHOW_ERROR,
          payload: {
            message: response,
            title: 'Ошибка сервера',
          }
        });
        setTimeout(() => {
          dispatch({ type: AUTH_HIDE_ERROR, payload: {} });
          unblockUserInteraction();
        }, 1500);
      }
    };

    dispatch({ type: AUTH_REQUEST, payload: {} });
    blockUserInteraction();

    requestChangeUserDataServer(user)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: AUTH_SUCCESS_USER, payload: {
              user: {
                name: res.user.name,
                email: res.user.email
              },
            }
          });
          setInputsData({
            name: res.user.name,
            email: res.user.email,
            password: '',
          });
          setTimeout(() => { unblockUserInteraction() }, LOADER_ANIMATION_TIME);
        }
        else {
          handleError(res);
        };
      })
      .catch(err => {
        handleError(err);
      });
  };
};