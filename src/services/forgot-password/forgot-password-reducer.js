import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_DEFAULT,
} from './forgot-password-actions';

const defaultState = {
  success: false,
  isLoading: false,
  isError: {
    state: false,
    title: '',
    message: '',
  },
};

const forgotPasswordReducer = (state = defaultState, action) => {

  switch (action.type) {

    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true
      };

    case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        isError: {
          ...state.isError,
          state: true,
          title: action.payload.title,
          message: `[${action.payload.message}]`,
        },
      };

    case FORGOT_PASSWORD_DEFAULT:
      return defaultState;

    default:
      return state;
  }
};

export { forgotPasswordReducer };