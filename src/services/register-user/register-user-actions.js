import { apiConfig } from '../../constants/constants';
import { postRegisterUserRequest } from '../../utils/api';
export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';

export function registerNewUser(valueName, valueEmail, valuePassword) {
  return function (dispatch) {
    dispatch({ type: REGISTER_USER_REQUEST, payload: {} });
    postRegisterUserRequest(apiConfig, valueName, valueEmail, valuePassword)
      .then(res => {        
        if (res && res.success) {
          dispatch({ type: REGISTER_USER_SUCCESS, payload: {} });
        }
        else {
          dispatch({ type: REGISTER_USER_ERROR, payload: {} });
        };
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: REGISTER_USER_ERROR, payload: {} });
      });
  };
};