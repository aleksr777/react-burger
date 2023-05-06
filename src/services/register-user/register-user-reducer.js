import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  REGISTER_USER_SET_DEFAULT_STATE,
} from './register-user-actions';

const defaultState = {
  isLoading: false,
  isSuccess: false,
  isError: {
    state: false,
    title: '',
    message: '',
  },
};

const registerUserReducer = (state = defaultState, action) => {

  switch (action.type) {

    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    };

    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: {
          ...state.isError,
          state: false,
        },
      };

    case REGISTER_USER_ERROR:
      return {
        ...state,
        isError: {
          ...state.isError,
          state: true,
          title: action.payload.title,
          message: `[${action.payload.message}]`,
        },
      };

    case REGISTER_USER_SET_DEFAULT_STATE:
      return defaultState;

    default:
      return state;
  }
};

export { registerUserReducer };