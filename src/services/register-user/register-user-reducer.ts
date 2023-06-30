import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  REGISTER_USER_SET_DEFAULT_STATE,
} from './register-user-actions';
import { RegisterUserDispatchActionType } from '../../types/register-user-types';

type StateType = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
};

const defaultState: StateType = {
  isLoading: false,
  isSuccess: false,
  isError: false,
};

const registerUserReducer = (
  state: StateType = defaultState,
  action: RegisterUserDispatchActionType
) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false,
      };

    case REGISTER_USER_ERROR:
      return {
        ...state,
        isError: true,
      };

    case REGISTER_USER_SET_DEFAULT_STATE:
      return defaultState;

    default:
      return state;
  }
};

export { registerUserReducer };
