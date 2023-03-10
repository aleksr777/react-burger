import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR
} from '../actions/reset-password-actions';

const defaultState = {
  loadingState: false,
  success: false
};

const resetPasswordReducer = (state = defaultState, action) => {

  switch (action.type) {

    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        loadingState: true
      };
    };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loadingState: false,
        success: true
      };

    case RESET_PASSWORD_ERROR:
      return defaultState;

    default:
      return state;
  }
};

export { resetPasswordReducer };