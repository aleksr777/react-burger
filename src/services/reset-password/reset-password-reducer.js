import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_SET_DEFAULT,
} from './reset-password-actions';

const defaultState = {
  success: false,
  isLoading: false,
  isError: {
    state: false,
    title: '',
    message: '',
  },
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
      return {
        ...state,
        isError: {
          ...state.isError,
          state: true,
          title: action.payload.title,
          message: `[${action.payload.message}]`,
        },
      };

    case RESET_PASSWORD_SET_DEFAULT:
      return defaultState;

    default:
      return state;
  }
};

export { resetPasswordReducer };