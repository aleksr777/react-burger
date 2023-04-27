import {
  SEND_AUTH_REQUEST,
  GET_DATA_AUTH_SUCCESS,
  GET_DATA_AUTH_ERROR,
  SET_DEFAULT_DATA_AUTH,
  SET_DEFAULT_ERROR_STATE_AUTH,
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

    case SEND_AUTH_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    };

    case GET_DATA_AUTH_SUCCESS:
      return {
        ...state,
        success: true,
        isLoading: false,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        user: action.payload.user
      };

    case GET_DATA_AUTH_ERROR:
      return {
        ...state,
        isError: {
          ...state.isError,
          state: true,
          title: action.payload.title,
          message: `[${action.payload.message}]`,
        },
      };

    case SET_DEFAULT_ERROR_STATE_AUTH:
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

    case SET_DEFAULT_DATA_AUTH:
      return defaultState;

    default:
      return state;
  }
};

export { authReducer };