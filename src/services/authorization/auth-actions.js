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

/* сопоставляем номер ошибки из ответа с номером ошибки, которую ищем */
export function matchNumErr(response, number) {
  return response.indexOf(parseInt(number)) !== -1 ? true : false;
}

export function deleteAuthData() {
  return function (dispatch) {
    dispatch({ type: AUTH_DEFAULT, payload: {} });
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}access-token`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}refresh-token`);
  }
}


/* ловим ошибку "401", чтобы обновить токен и снова сделать запрос */
export function handleAuthError(response, request) {
  return function (dispatch) {
    /* Сделал счётчик, чтобы не было зацикливания (не более 3х попыток запроса) */
    let countRequest = Number(sessionStorage.getItem(`${STORAGE_KEY_PREFIX}count-request-catch-error-401`));
    console.log(countRequest);
    (countRequest < 1 || !countRequest) ? countRequest = 1 : countRequest = ++countRequest;
    if (countRequest > 3) {
      sessionStorage.removeItem(`${STORAGE_KEY_PREFIX}count-request-catch-error-401`);
      dispatch({
        type: AUTH_SHOW_ERROR,
        payload: {
          message: response,
          title: 'Ошибка авторизации',
        }
      });
      setTimeout(() => {
        dispatch({ type: AUTH_HIDE_ERROR, payload: {} });
        dispatch(deleteAuthData()); /* автоматически переходим на '/login' */
      }, 1500);
    }
    else {
      sessionStorage.setItem(`${STORAGE_KEY_PREFIX}count-request-catch-error-401`, countRequest);
      dispatch(requestUpdateToken(request));
    };
  }
};


/* Запрос на обновление токена */
export function requestUpdateToken(repeatRequest) {
  return function (dispatch) {
    dispatch({ type: AUTH_REQUEST, payload: {} });
    requestUpdateTokenServer()
      .then(res => {
        if (res && res.success) {
          localStorage.setItem(`${STORAGE_KEY_PREFIX}access-token`, res.accessToken);
          localStorage.setItem(`${STORAGE_KEY_PREFIX}refresh-token`, res.refreshToken);
          dispatch({ type: AUTH_SUCCESS_UPDATE_TOKEN, payload: {} });
          dispatch(repeatRequest);
        }
        else {
          console.log(res);
        };
      })
      .catch(err => {
        console.log(err);
      });
  };
};


/* Запрос входа в аккаунт */
export function requestLogin(email, password) {

  return function (dispatch) {

    function handleError(response) {
      console.log(response);
      dispatch({
        type: AUTH_SHOW_ERROR,
        payload: {
          message: response,
          title: 'Ошибка авторизации',
        }
      });
      setTimeout(() => {
        dispatch(deleteAuthData())
      }, 1500);
    };

    dispatch({ type: AUTH_REQUEST, payload: {} });

    requestLoginServer(email, password)
      .then(res => {
        if (res && res.success) {
          localStorage.setItem(`${STORAGE_KEY_PREFIX}access-token`, res.accessToken);
          localStorage.setItem(`${STORAGE_KEY_PREFIX}refresh-token`, res.refreshToken);
          dispatch({ type: AUTH_SUCCESS_LOGIN, payload: {} });
          dispatch({
            type: AUTH_SUCCESS_USER, payload: {
              user: {
                name: res.user.name,
                email: res.user.email
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
          dispatch(deleteAuthData());
        }, 1500);
      }
    };

    dispatch({ type: AUTH_REQUEST, payload: {} });

    requestLogoutServer()
      .then(res => {
        if (res && res.success) {
          setTimeout(() => {
            dispatch(deleteAuthData());
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
        }, 1500);
      }
    };

    dispatch({ type: AUTH_REQUEST, payload: {} });

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
export function requestChangeUserData(user, setIsFormChanged) {

  return function (dispatch) {

    function handleError(response) {
      console.log(response);
      /* ловим ошибку "401", чтобы обновить токен и снова сделать запрос */
      if (matchNumErr(response, 401)) {
        dispatch(handleAuthError(response, requestChangeUserData(user, setIsFormChanged)));
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
        }, 1500);
      }
    };

    dispatch({ type: AUTH_REQUEST, payload: {} });

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
          setIsFormChanged(false);
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