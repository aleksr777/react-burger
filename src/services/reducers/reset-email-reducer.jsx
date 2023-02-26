import {
  RESET_EMAIL_REQUEST,
  RESET_EMAIL_SUCCESS,
  RESET_EMAIL_ERROR,
} from '../actions/reset-email-actions';

const defaultResetEmailState = {
  loadingState: false,
  success: false, 
  message: ''
};

const resetEmailReducer = (state = defaultResetEmailState, action) => {

  switch (action.type) {

    case RESET_EMAIL_REQUEST: {
      return {
        ...state,
        loadingState: true,
        success: false,
        message: ''
      };
    };

    case RESET_EMAIL_SUCCESS:
      return {
        ...state,
        loadingState: false,
        success: action.payload.success,
        message: action.payload.message
      };

    case RESET_EMAIL_ERROR:
      return defaultResetEmailState;

    default:
      return state;
  }
};

export { resetEmailReducer };