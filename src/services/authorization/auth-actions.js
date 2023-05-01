import {
  LOADER_ANIMATION_TIME,
  STORAGE_KEY_PREFIX,
} from '../../constants/constants';
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


/* Запрос на обновление токена */
export function requestUpdateToken(repeatRequest) {

  return function (dispatch) {

    const refreshToken = localStorage.getItem(`${STORAGE_KEY_PREFIX}refreshToken`);

    function handleError(response) {
      console.log(response);
      localStorage.setItem(`${STORAGE_KEY_PREFIX}accessToken`, '');
      localStorage.setItem(`${STORAGE_KEY_PREFIX}refreshToken`, '');
      dispatch({
        type: AUTH_SHOW_ERROR,
        payload: {
          message: response,
          title: 'Ошибка авторизации',
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
          dispatch(repeatRequest);
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
          title: 'Ошибка авторизации',
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
          console.log(res);
          localStorage.setItem(`${STORAGE_KEY_PREFIX}accessToken`, res.accessToken);
          localStorage.setItem(`${STORAGE_KEY_PREFIX}refreshToken`, res.refreshToken);
          dispatch({ type: AUTH_SUCCESS_LOGIN, payload: {} });
          dispatch({
            type: AUTH_SUCCESS_USER, payload: {
              user: {
                name: res.user.name,
                email: res.user.email,
                password: password,
              },
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
      /* ловим ошибку "401", чтобы обновить токен и снова сделать запрос */
      if (response.indexOf('401') !== -1) {
        dispatch(requestUpdateToken(requestLogout(refreshToken)));
      }
      dispatch({
        type: AUTH_SHOW_ERROR,
        payload: {
          message: response,
          title: 'Ошибка авторизации',
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


/* Запрос на получение данных о пользователе */
export function requestGetUserData(password) {

  return function (dispatch) {

    function handleError(response) {
      console.log(response);
      dispatch({
        type: AUTH_SHOW_ERROR,
        payload: {
          message: response,
          title: 'Ошибка сервера',
        }
      });
      setTimeout(() => {
        dispatch({ type: AUTH_HIDE_ERROR, payload: {} });
      }, 1500);
    };

    dispatch({ type: AUTH_REQUEST, payload: {} });

    requestGetUserDataServer()
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: AUTH_SUCCESS_USER, payload: {
              user: {
                name: res.user.name,
                email: res.user.email,
                password: password,
              },
            }
          });
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
export function requestChangeUserData(email, userName, password) {

  return function (dispatch) {

    function handleError(response) {
      console.log(response);
      dispatch({
        type: AUTH_SHOW_ERROR,
        payload: {
          message: response,
          title: 'Ошибка сервера',
        }
      });
      setTimeout(() => {
        dispatch({ type: AUTH_HIDE_ERROR, payload: {} });
      }, 1500);
    };

    dispatch({ type: AUTH_REQUEST, payload: {} });

    requestChangeUserDataServer(email, userName)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: AUTH_SUCCESS_USER, payload: {
              user: {
                name: res.user.name,
                email: res.user.email,
                password: password,
              },
            }
          });
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