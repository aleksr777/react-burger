import {
  SEND_LOGIN_REQUEST,
  GET_DATA_LOGIN_SUCCESS,
  GET_DATA_LOGIN_ERROR,
  SET_DEFAULT_DATA_LOGIN,
  SET_DEFAULT_ERROR_STATE_LOGIN,
} from './login-actions';

const defaultState = {
  isLoading: false,
  success: false,
  accessToken: '',
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

const loginReducer = (state = defaultState, action) => {

  switch (action.type) {

    case SEND_LOGIN_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    };

    case GET_DATA_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        accessToken: action.payload.accessToken,
        user: action.payload.user
      };

    case GET_DATA_LOGIN_ERROR:
      return {
        ...state,
        isError: {
          ...state.isError,
          state: true,
          title: action.payload.title,
          message: `[${action.payload.message}]`,
        },
      };

    case SET_DEFAULT_ERROR_STATE_LOGIN:
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

    case SET_DEFAULT_DATA_LOGIN:
      return defaultState;

    default:
      return state;
  }
};

export { loginReducer };