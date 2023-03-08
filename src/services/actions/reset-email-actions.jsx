import { apiConfig } from '../../constants/constants';
import { postResetEmailRequest } from '../../utils/api';
export const RESET_EMAIL_REQUEST = 'RESET_EMAIL_REQUEST';
export const RESET_EMAIL_SUCCESS = 'RESET_EMAIL_SUCCESS';
export const RESET_EMAIL_ERROR = 'RESET_EMAIL_ERROR';

export function resetEmailRequest(valueEmail) {
  return function (dispatch) {
    dispatch({ type: RESET_EMAIL_REQUEST, payload: {} });
    postResetEmailRequest(apiConfig, valueEmail)
      .then(res => {
        if (res && res.success) {
          dispatch({ type: RESET_EMAIL_SUCCESS, payload: {} });
        }
        else {
          dispatch({ type: RESET_EMAIL_ERROR, payload: {} });
        };
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: RESET_EMAIL_ERROR, payload: {} });
      });
  };
};