import {
  AUTH_REQUEST,
  AUTH_SUCCESS_LOGIN,
  AUTH_SUCCESS_USER,
  AUTH_SUCCESS_ORDERS,
  AUTH_SHOW_ERROR,
  AUTH_DEFAULT,
  AUTH_HIDE_ERROR,
  AUTH_SUCCESS_UPDATE_TOKEN,
} from './auth-actions';

const defaultState = {
  isSuccess: false,
  isLoading: false,
  isError: false,
  user: {
    name: '',
    email: '',
  },
  orders: [],
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
        isSuccess: true,
        isLoading: false,
        isError: false,
      };

    case AUTH_SUCCESS_USER:
      return {
        ...state,
        isSuccess: true,
        isLoading: false,
        isError: false,
        user: action.payload.user,
      };

    case AUTH_SUCCESS_ORDERS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        orders: action.payload.orders,
        isError: false,
      };

    case AUTH_SUCCESS_UPDATE_TOKEN:
      return {
        ...state,
        isSuccess: true,
        isLoading: false,
        isError: false,
      };

    case AUTH_SHOW_ERROR:
      return {
        ...state,
        isError: true,
      };

    case AUTH_HIDE_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: false,
      };

    case AUTH_DEFAULT:
      return defaultState;

    default:
      return state;
  }
};

export { authReducer };