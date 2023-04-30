import {
  AUTH_REQUEST,
  AUTH_SUCCESS_LOGIN,
  AUTH_SUCCESS_USER,
  AUTH_SHOW_ERROR,
  AUTH_DEFAULT,
  AUTH_HIDE_ERROR,
  AUTH_SUCCESS_UPDATE_TOKEN,
} from './auth-actions';

const defaultState = {
  isLoading: false,
  success: false,
  user: {
    name: '',
    email: '',
    password: '',
  },
  isError: {
    state: false,
    title: '',
    message: '',
  },
};

const authReducer = (state = defaultState, action) => {

  switch (action.type) {

    case AUTH_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    };

    case AUTH_SUCCESS_LOGIN:
      return {
        ...state,
        isLoading: false,
        success: true,
      };

    case AUTH_SUCCESS_USER:
      return {
        ...state,
        user: action.payload.user
      };

    case AUTH_SUCCESS_UPDATE_TOKEN:
      return {
        ...state,
        isLoading: false,
        success: true,
      };

    case AUTH_SHOW_ERROR:
      return {
        ...state,
        isError: {
          ...state.isError,
          state: true,
          title: action.payload.title,
          message: `[${action.payload.message}]`,
        },
      };

    case AUTH_HIDE_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: {
          ...state.isError,
          state: false,
          title: '',
          message: '',
        },
      };

    case AUTH_DEFAULT:
      return defaultState;

    default:
      return state;
  }
};

export { authReducer };