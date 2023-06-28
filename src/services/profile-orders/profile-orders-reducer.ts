import { profileOrdersActions } from './profile-orders-actions';
import { OrderInfoType } from '../../types/types';

type StateType = {
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  orders: null | OrderInfoType[];
};

const defaultState: StateType = {
  isSuccess: false,
  isLoading: false,
  isError: false,
  orders: null,
};

const profileOrdersReducer = (state: StateType = defaultState, action: any) => {
  switch (action.type) {
    case profileOrdersActions.request: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case profileOrdersActions.success:
      return {
        ...state,
        isSuccess: true,
        isLoading: false,
        isError: false,
        orders: action.payload.orders,
      };

    case profileOrdersActions.showError:
      return {
        ...state,
        isError: true,
      };

    case profileOrdersActions.hideError:
      return {
        ...state,
        isLoading: false,
        isError: false,
      };

    default:
      return state;
  }
};

export { profileOrdersReducer };
