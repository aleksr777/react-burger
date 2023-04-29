import { LOADER_ANIMATION_TIME, STORAGE_KEY_PREFIX } from '../../constants/constants';
import { requestLoginServer, requestLogoutServer, requestUpdateTokenServer } from '../../utils/api';
export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS_LOGIN = 'AUTH_SUCCESS_LOGIN';
export const AUTH_SUCCESS_UPDATE_TOKEN = 'AUTH_SUCCESS_UPDATE_TOKEN';
export const AUTH_SHOW_ERROR = 'AUTH_SHOW_ERROR';
export const AUTH_DEFAULT = 'AUTH_DEFAULT';
export const AUTH_HIDE_ERROR = 'AUTH_HIDE_ERROR';

/* Запрос входа в аккаунт */
export function requestLogin(goBackToPage, email, password) {

  return function (dispatch) {

    function handleError(response) {
      console.log(response);
      localStorage.setItem(`${STORAGE_KEY_PREFIX}accessToken`, '');
      localStorage.setItem(`${STORAGE_KEY_PREFIX}refreshToken`, '');
      dispatch({
        type: AUTH_SHOW_ERROR,
        payload: {
          message: response,
          title: 'Ошибка входа в аккаунт',
        }
      });
      setTimeout(() => {
        dispatch({ type: AUTH_DEFAULT, payload: {} });
      }, 1500);
    };

    dispatch({ type: AUTH_REQUEST, payload: {} });

    requestLoginServer(email, password)
      .then(res => {
        if (res && res.success) {
          localStorage.setItem(`${STORAGE_KEY_PREFIX}accessToken`, res.accessToken);
          localStorage.setItem(`${STORAGE_KEY_PREFIX}refreshToken`, res.refreshToken);
          dispatch({
            type: AUTH_SUCCESS_LOGIN,
            payload: {
              user: {
                name: res.user.name,
                email: res.user.email,
                password: password,
              }
            }
          });
          setTimeout(() => { goBackToPage() }, LOADER_ANIMATION_TIME);

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
export function requestLogout(refreshToken) {

  return function (dispatch) {

    function handleError(response) {
      console.log(response);
      dispatch({
        type: AUTH_SHOW_ERROR,
        payload: {
          message: response,
          title: 'Ошибка выхода из аккаунта',
        }
      });
      setTimeout(() => {
        dispatch({ type: AUTH_HIDE_ERROR, payload: {} });
      }, 1500);
    };

    dispatch({ type: AUTH_REQUEST, payload: {} });

    requestLogoutServer(refreshToken)
      .then(res => {
        if (res && res.success) {
          setTimeout(() => {
            dispatch({ type: AUTH_DEFAULT, payload: {} });
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

/* Запрос на обновление токена */
export function requestUpdateToken(goToLoginPage, refreshToken) {

  return function (dispatch) {

    function handleError(response) {
      console.log(response);
      localStorage.setItem(`${STORAGE_KEY_PREFIX}accessToken`, '');
      localStorage.setItem(`${STORAGE_KEY_PREFIX}refreshToken`, '');
      dispatch({
        type: AUTH_SHOW_ERROR,
        payload: {
          message: response,
          title: 'Ошибка обновления токена',
        }
      });
      setTimeout(() => {
        dispatch({ type: AUTH_DEFAULT, payload: {} });
      }, 1500);
    };

    dispatch({ type: AUTH_REQUEST, payload: {} });

    requestUpdateTokenServer(refreshToken)
      .then(res => {
        if (res && res.success) {
          localStorage.setItem(`${STORAGE_KEY_PREFIX}accessToken`, res.accessToken);
          localStorage.setItem(`${STORAGE_KEY_PREFIX}refreshToken`, res.refreshToken);
          dispatch({ type: AUTH_SUCCESS_UPDATE_TOKEN, payload: {} });
          setTimeout(() => { goToLoginPage() }, LOADER_ANIMATION_TIME);
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
