import { apiConfig, LOADER_ANIMATION_TIME } from '../../constants/constants';
import { resetPasswordRequestServer } from '../../utils/api';
import { FORGOT_PASSWORD_SET_DEFAULT_STATE } from '../forgot-password/forgot-password-actions';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';
export const RESET_PASSWORD_SET_DEFAULT_STATE = 'RESET_PASSWORD_SET_DEFAULT_STATE';


export function resetPasswordRequest(goToAuthPage, valuePassword, valueCode) {

  return function (dispatch) {

    function handleError(response) {
      console.log(response);
      dispatch({
        type: RESET_PASSWORD_ERROR,
        payload: {
          message: response,
          title: 'Ошибка сервера',
        }
      });
      setTimeout(() => {
        dispatch({ type: RESET_PASSWORD_SET_DEFAULT_STATE, payload: {} });
      }, 1500);
    };

    dispatch({ type: RESET_PASSWORD_REQUEST, payload: {} });

    resetPasswordRequestServer(apiConfig, valuePassword, valueCode)
      .then(res => {
        if (res && res.success) {
          dispatch({ type: RESET_PASSWORD_SUCCESS, payload: {} });
          setTimeout(() => {
            dispatch({ type: RESET_PASSWORD_SET_DEFAULT_STATE, payload: {} });
            dispatch({ type: FORGOT_PASSWORD_SET_DEFAULT_STATE, payload: {} });
            goToAuthPage();
          }, LOADER_ANIMATION_TIME);
        }
        else { handleError(res) };
      })
      .catch(err => handleError(err));
  };
};