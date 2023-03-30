import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR
} from './reset-password-actions';

const defaultState = {
  isLoading: false,
  success: false
};

const resetPasswordReducer = (state = defaultState, action) => {

  switch (action.type) {

    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true
      };

    case RESET_PASSWORD_ERROR:
      return defaultState;

    default:
      return state;
  }
};

export { resetPasswordReducer };