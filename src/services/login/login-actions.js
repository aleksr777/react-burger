import { apiConfig, LOADER_ANIMATION_TIME } from '../../constants/constants';
import { requestLoginServer, requestLogoutServer } from '../../utils/api';
export const SEND_LOGIN_REQUEST = 'SEND_LOGIN_REQUEST';
export const GET_DATA_LOGIN_SUCCESS = 'GET_DATA_LOGIN_SUCCESS';
export const GET_DATA_LOGIN_ERROR = 'GET_DATA_LOGIN_ERROR';
export const SET_DEFAULT_DATA_LOGIN = 'SET_DEFAULT_DATA_LOGIN';


export function requestLogin(goBackToPage, email, password) {

  return function (dispatch) {

    function saveRefreshToken(refreshToken) {
      localStorage.setItem('ReactBurgerRefreshToken', refreshToken);
    }

    function handleError(response) {
      console.log(response);
      dispatch({ type: GET_DATA_LOGIN_ERROR, payload: { message: response } });
      setTimeout(() => {
        dispatch({ type: SET_DEFAULT_DATA_LOGIN, payload: {} });
      }, 800);
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


export function requestLogout() {

  return function (dispatch) {

    const refreshToken = localStorage.getItem('ReactBurgerRefreshToken');

    function removeRefreshToken() {
      localStorage.setItem('ReactBurgerRefreshToken', '');
    }

    function handleError(response) {
      console.log(response);
      dispatch({ type: GET_DATA_LOGIN_ERROR, payload: { errorMessage: response } });
    };

    dispatch({ type: SEND_LOGIN_REQUEST, payload: {} });

    requestLogoutServer(apiConfig, refreshToken)
      .then(res => {
        if (res && res.success) {
          console.log(res);
          dispatch({ type: SET_DEFAULT_DATA_LOGIN, payload: {} });
          removeRefreshToken();
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
