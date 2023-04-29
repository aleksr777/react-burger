import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_SHOW_ERROR,
  AUTH_DEFAULT,
  AUTH_HIDE_ERROR,
} from './auth-actions';

const defaultState = {
  success: false,
  isLoading: false,
  accessToken: '',
  refreshToken: '',
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

    case AUTH_SUCCESS:
      return {
        ...state,
        success: true,
        isLoading: false,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        user: action.payload.user
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