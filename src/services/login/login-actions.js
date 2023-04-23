import { apiConfig, LOADER_ANIMATION_TIME } from '../../constants/constants';
import { requestLoginServer, requestLogoutServer } from '../../utils/api';
export const SEND_LOGIN_REQUEST = 'SEND_LOGIN_REQUEST';
export const GET_DATA_LOGIN_SUCCESS = 'GET_DATA_LOGIN_SUCCESS';
export const GET_DATA_LOGIN_ERROR = 'GET_DATA_LOGIN_ERROR';
export const SET_DEFAULT_DATA_LOGIN = 'SET_DEFAULT_DATA_LOGIN';
export const SET_DEFAULT_ERROR_STATE_LOGIN = 'SET_DEFAULT_ERROR_STATE_LOGIN';

/* Запрос входа в аккаунт */
export function requestLogin(goBackToPage, email, password) {

  return function (dispatch) {

    function saveRefreshToken(refreshToken) {
      localStorage.setItem('ReactBurgerRefreshToken', refreshToken);
    }

    function handleError(response) {
      console.log(response);
      dispatch({
        type: GET_DATA_LOGIN_ERROR,
        payload: {
          message: response,
          title: 'Ошибка входа в аккаунт',
        }
      });
      setTimeout(() => {
        dispatch({ type: SET_DEFAULT_DATA_LOGIN, payload: {} });
      }, 1500);
    };

    dispatch({ type: SEND_LOGIN_REQUEST, payload: {} });

    requestLoginServer(apiConfig, email, password)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_DATA_LOGIN_SUCCESS,
            payload: {
              accessToken: res.accessToken,
              refreshToken: res.refreshToken,
              user: {
                name: res.user.name,
                email: res.user.email,
                password: password,
              }
            }
          });
          saveRefreshToken(res.refreshToken);
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
export function requestLogout() {

  return function (dispatch) {

    const refreshToken = localStorage.getItem('ReactBurgerRefreshToken');

    function removeRefreshToken() {
      localStorage.setItem('ReactBurgerRefreshToken', '');
    }

    function handleError(response) {
      console.log(response);
      dispatch({
        type: GET_DATA_LOGIN_ERROR,
        payload: {
          message: response,
          title: 'Ошибка выхода из аккаунта',
        }
      });
      setTimeout(() => {
        dispatch({ type: SET_DEFAULT_ERROR_STATE_LOGIN, payload: {} });
      }, 1500);
    };

    dispatch({ type: SEND_LOGIN_REQUEST, payload: {} });

    requestLogoutServer(apiConfig, refreshToken)
      .then(res => {
        if (res && res.success) {
          dispatch({ type: SET_DEFAULT_ERROR_STATE_LOGIN, payload: {} });
          setTimeout(() => {
            removeRefreshToken();
            dispatch({ type: SET_DEFAULT_DATA_LOGIN, payload: {} });
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
