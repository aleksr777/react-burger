import { LOADER_ANIMATION_TIME } from '../../constants/constants';
import { forgotPasswordRequestServer } from '../../utils/api';
import {
  blockUserInteraction,
  unblockUserInteraction,
} from '../block-user-interaction-service/block-user-interaction-service';
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';
export const FORGOT_PASSWORD_DEFAULT = 'FORGOT_PASSWORD_DEFAULT';


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
        unblockUserInteraction();
        dispatch({ type: FORGOT_PASSWORD_DEFAULT, payload: {} });
      }, 1500);
    };

    dispatch({ type: FORGOT_PASSWORD_REQUEST, payload: {} });

    forgotPasswordRequestServer(valueEmail)
      .then(res => {
        if (res && res.success) {
          setTimeout(() => { unblockUserInteraction() }, LOADER_ANIMATION_TIME);
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