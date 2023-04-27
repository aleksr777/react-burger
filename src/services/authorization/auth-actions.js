import { apiConfig, LOADER_ANIMATION_TIME } from '../../constants/constants';
import { requestLoginServer, requestLogoutServer } from '../../utils/api';
export const SEND_AUTH_REQUEST = 'SEND_AUTH_REQUEST';
export const GET_DATA_AUTH_SUCCESS = 'GET_DATA_AUTH_SUCCESS';
export const GET_DATA_AUTH_ERROR = 'GET_DATA_AUTH_ERROR';
export const SET_DEFAULT_DATA_AUTH = 'SET_DEFAULT_DATA_AUTH';
export const SET_DEFAULT_ERROR_STATE_AUTH = 'SET_DEFAULT_ERROR_STATE_AUTH';

/* Запрос входа в аккаунт */
export function requestLogin(goBackToPage, email, password) {

  return function (dispatch) {

    function handleError(response) {
      console.log(response);
      dispatch({
        type: GET_DATA_AUTH_ERROR,
        payload: {
          message: response,
          title: 'Ошибка входа в аккаунт',
        }
      });
      setTimeout(() => {
        dispatch({ type: SET_DEFAULT_DATA_AUTH, payload: {} });
      }, 1500);
    };

    dispatch({ type: SEND_AUTH_REQUEST, payload: {} });

    requestLoginServer(apiConfig, email, password)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_DATA_AUTH_SUCCESS,
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
        type: GET_DATA_AUTH_ERROR,
        payload: {
          message: response,
          title: 'Ошибка выхода из аккаунта',
        }
      });
      setTimeout(() => {
        dispatch({ type: SET_DEFAULT_ERROR_STATE_AUTH, payload: {} });
      }, 1500);
    };

    dispatch({ type: SEND_AUTH_REQUEST, payload: {} });

    requestLogoutServer(apiConfig, refreshToken)
      .then(res => {
        if (res && res.success) {
          dispatch({ type: SET_DEFAULT_ERROR_STATE_AUTH, payload: {} });
          setTimeout(() => {
            dispatch({ type: SET_DEFAULT_DATA_AUTH, payload: {} });
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
