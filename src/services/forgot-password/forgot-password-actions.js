import { apiConfig, LOADER_ANIMATION_TIME } from '../../constants/constants';
import { forgotPasswordRequestServer } from '../../utils/api';
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';
export const FORGOT_PASSWORD_SET_DEFAULT_STATE = 'FORGOT_PASSWORD_SET_DEFAULT_STATE';


export function forgotPasswordRequest(goToResetPasswordPage, valueEmail) {

  return function (dispatch) {

    function handleError(response) {
      console.log(response);
      dispatch({
        type: FORGOT_PASSWORD_ERROR,
        payload: {
          message: response,
          title: 'Ошибка сервера',
        }
      });
      setTimeout(() => {
        dispatch({ type: FORGOT_PASSWORD_SET_DEFAULT_STATE, payload: {} });
      }, 1500);
    };

    dispatch({ type: FORGOT_PASSWORD_REQUEST, payload: {} });

    forgotPasswordRequestServer(apiConfig, valueEmail)
      .then(res => {
        if (res && res.success) {
          dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: {} });
          setTimeout(() => {
            goToResetPasswordPage();
          }, LOADER_ANIMATION_TIME);
        }
        else { handleError(res) };
      })
      .catch(err => handleError(err));
  };
};