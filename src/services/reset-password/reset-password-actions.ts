import { DispatchFuncType } from '../../types/types';
import { ResetPasswordType, ResetPasswordActionsType } from '../../types/reset-password-types';
import { LOADER_ANIMATION_TIME } from '../../constants/constants';
import { resetPasswordRequestServer } from '../../utils/api';
import {
  blockUserInteraction,
  unblockUserInteraction,
} from '../block-user-interaction-service/block-user-interaction-service';
import { FORGOT_PASSWORD_DEFAULT } from '../forgot-password/forgot-password-actions';
export const RESET_PASSWORD_REQUEST: ResetPasswordActionsType = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS: ResetPasswordActionsType = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR: ResetPasswordActionsType = 'RESET_PASSWORD_ERROR';
export const RESET_PASSWORD_SET_DEFAULT: ResetPasswordActionsType = 'RESET_PASSWORD_SET_DEFAULT';

export function resetPasswordRequest(
  goToAuthPage: () => void,
  valuePassword: string,
  valueCode: string
): DispatchFuncType {
  return function (dispatch) {
    function handleError(response: string) {
      console.log(response);
      dispatch({ type: RESET_PASSWORD_ERROR, payload: {} });
      setTimeout(() => {
        unblockUserInteraction();
        dispatch({ type: RESET_PASSWORD_SET_DEFAULT, payload: {} });
      }, 2000);
    }

    dispatch({ type: RESET_PASSWORD_REQUEST, payload: {} });
    blockUserInteraction();

    resetPasswordRequestServer(valuePassword, valueCode)
      .then((res: ResetPasswordType) => {
        if (typeof res === 'object' && res.success) {
          dispatch({ type: RESET_PASSWORD_SUCCESS, payload: {} });
          setTimeout(() => {
            unblockUserInteraction();
            dispatch({ type: RESET_PASSWORD_SET_DEFAULT, payload: {} });
            dispatch({ type: FORGOT_PASSWORD_DEFAULT, payload: {} });
            goToAuthPage();
          }, LOADER_ANIMATION_TIME);
        } else if (typeof res === 'string') {
          handleError(res);
        }
      })
      .catch((err: string) => handleError(err));
  };
}
