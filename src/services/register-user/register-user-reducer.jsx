import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR
} from './register-user-actions';

const defaultState = {
  loadingState: false,
  success: false
};

const registerUserReducer = (state = defaultState, action) => {

  switch (action.type) {

    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        loadingState: true
      };
    };

    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loadingState: false,
        success: true
      };

    case REGISTER_USER_ERROR:
      return defaultState;

    default:
      return state;
  }
};

export { registerUserReducer };