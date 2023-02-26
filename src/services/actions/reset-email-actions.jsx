import { apiConfig } from '../../constants/constants';
import { postResetEmailRequest } from '../../utils/api';
export const RESET_EMAIL_REQUEST = 'RESET_EMAIL_REQUEST';
export const RESET_EMAIL_SUCCESS = 'RESET_EMAIL_SUCCESS';
export const RESET_EMAIL_ERROR = 'RESET_EMAIL_SUCCESS';

export function resetEmailRequest(valueEmail) {
  return function (dispatch) {
    dispatch({ type: RESET_EMAIL_REQUEST })
    postResetEmailRequest(apiConfig, valueEmail)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: RESET_EMAIL_SUCCESS, payload: { success: res.success, message: res.message }
          })
        }
        else {
          dispatch({
            type: RESET_EMAIL_ERROR
          });
        };
      })
      .catch(err => console.log(err));
  };
};