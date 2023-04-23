import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  SET_DEFAULT_STATE_REGISTER_USER,
} from './register-user-actions';

const defaultState = {
  isLoading: false,
  success: false,
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
        success: true
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

    case SET_DEFAULT_STATE_REGISTER_USER:
      return defaultState;

    default:
      return state;
  }
};

export { registerUserReducer };