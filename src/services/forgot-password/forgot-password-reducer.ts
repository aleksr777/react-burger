import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_DEFAULT,
} from './forgot-password-actions'

type StateType = {
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
};

const defaultState: StateType = {
  isSuccess: false,
  isLoading: false,
  isError: false,
};

const forgotPasswordReducer = (state: StateType = defaultState, action: any) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false,
      };

    case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        isError: true,
      };

    case FORGOT_PASSWORD_DEFAULT:
      return defaultState;

    default:
      return state;
  }
};

export { forgotPasswordReducer }