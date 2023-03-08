import { apiConfig } from '../../constants/constants';
import { postResetPasswordRequest } from '../../utils/api';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';

export function resetPasswordRequest(valuePassword, valueCode) {
  return function (dispatch) {
    dispatch({ type: RESET_PASSWORD_REQUEST, payload: {} });
    postResetPasswordRequest(apiConfig, valuePassword, valueCode)
      .then(res => {        
        if (res && res.success) {
          dispatch({ type: RESET_PASSWORD_SUCCESS, payload: {} });
        }
        else {
          dispatch({ type: RESET_PASSWORD_ERROR, payload: {} });
        };
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: RESET_PASSWORD_ERROR, payload: {} });
      });
  };
};