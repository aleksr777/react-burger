import {
  RESET_EMAIL_REQUEST,
  RESET_EMAIL_SUCCESS,
  RESET_EMAIL_ERROR
} from './reset-email-actions';

const defaultState = {
  isLoading: false,
  success: false
};

const resetEmailReducer = (state = defaultState, action) => {
  
  switch (action.type) {

    case RESET_EMAIL_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    };

    case RESET_EMAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true
      };

    case RESET_EMAIL_ERROR:
      return defaultState;

    default:
      return state;
  }
};

export { resetEmailReducer };