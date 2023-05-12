import {
  LOADER_ANIMATION_TIME,
} from '../../constants/constants';
import {
  saveAccessToken,
  saveRefreshToken,
} from '../authorization/tokens-service';
import {
  registerUserRequestServer,
} from '../../utils/api';
import {
  blockUserInteraction,
  unblockUserInteraction,
} from '../block-user-interaction-service/block-user-interaction-service';
import {
  AUTH_SUCCESS_LOGIN,
  AUTH_SUCCESS_USER,
} from '../authorization/auth-actions';
export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';
export const REGISTER_USER_SET_DEFAULT_STATE = 'REGISTER_USER_SET_DEFAULT_STATE';


export function registerUserRequest(valueName, valueEmail, valuePassword) {

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
        unblockUserInteraction();
        dispatch({ type: REGISTER_USER_SET_DEFAULT_STATE, payload: {} });
      }, 1500);
    };

    dispatch({ type: REGISTER_USER_REQUEST, payload: {} });
    blockUserInteraction();

    registerUserRequestServer(valueName, valueEmail, valuePassword)
      .then(res => {
        if (res && res.success) {
          dispatch({ type: REGISTER_USER_SUCCESS, payload: {} });
          saveAccessToken(res.accessToken);
          saveRefreshToken(res.refreshToken);
          dispatch({ type: AUTH_SUCCESS_LOGIN, payload: {} });
          dispatch({
            type: AUTH_SUCCESS_USER, payload: {
              user: {
                name: res.user.name,
                email: res.user.email,
                password: valuePassword,
              },
            }
          });
          setTimeout(() => {
            unblockUserInteraction();
            dispatch({ type: REGISTER_USER_SET_DEFAULT_STATE, payload: {} });
          }, LOADER_ANIMATION_TIME);
        }
        else { handleError(res) };
      })
      .catch(err => handleError(err));
  };
};