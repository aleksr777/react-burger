import { LOADER_ANIMATION_TIME } from '../../constants/constants';
import { registerUserRequestServer } from '../../utils/api';
export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';
export const REGISTER_USER_SET_DEFAULT_STATE = 'REGISTER_USER_SET_DEFAULT_STATE';


export function registerUserRequest(goToLoginPage, valueName, valueEmail, valuePassword) {

  return function (dispatch) {

    function handleError(response) {
      console.log(response);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: {
          message: response,
          title: 'Ошибка регистрации',
        }
      });
      setTimeout(() => {
        dispatch({ type: REGISTER_USER_SET_DEFAULT_STATE, payload: {} });
      }, 1500);
    };

    dispatch({ type: REGISTER_USER_REQUEST, payload: {} });

    registerUserRequestServer(valueName, valueEmail, valuePassword)
      .then(res => {
        if (res && res.success) {
          dispatch({ type: REGISTER_USER_SUCCESS, payload: {} });
          setTimeout(() => {
            dispatch({ type: REGISTER_USER_SET_DEFAULT_STATE, payload: {} });
            goToLoginPage();
          }, LOADER_ANIMATION_TIME);
        }
        else { handleError(res) };
      })
      .catch(err => handleError(err));
  };
};