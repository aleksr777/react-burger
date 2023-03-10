import {
  RESET_EMAIL_REQUEST,
  RESET_EMAIL_SUCCESS,
  RESET_EMAIL_ERROR
} from '../actions/reset-email-actions';

const defaultState = {
  loadingState: false,
  success: false
};

const resetEmailReducer = (state = defaultState, action) => {
  
  switch (action.type) {

    case RESET_EMAIL_REQUEST: {
      return {
        ...state,
        loadingState: true
      };
    };

    case RESET_EMAIL_SUCCESS:
      return {
        ...state,
        loadingState: false,
        success: true
      };

    case RESET_EMAIL_ERROR:
      return defaultState;

    default:
      return state;
  }
};

export { resetEmailReducer };