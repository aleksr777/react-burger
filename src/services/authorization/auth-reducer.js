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
  isLoading: false,
  isSuccess: false,
  user: {
    name: '',
    email: '',
  },
  orders: [],
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
        isSuccess: true,
        isError: {
          ...state.isError,
          state: false,
        }
      };

    case AUTH_SUCCESS_USER:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        user: action.payload.user,
        isError: {
          ...state.isError,
          state: false,
        }
      };

    case AUTH_SUCCESS_ORDERS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true, 
        orders: action.payload.orders,
        isError: {
          ...state.isError,
          state: false,
        }
      };

    case AUTH_SUCCESS_UPDATE_TOKEN:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: {
          ...state.isError,
          state: false,
        }
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