import { profileOrdersActions } from './feed-profile-orders-actions';
import { StateType, DispatchType } from '../../types/feed-profiles-orders-types';

const defaultState: StateType = {
  isSuccess: false,
  isLoading: false,
  isError: false,
  orders: null,
};

const profileOrdersReducer = (state: StateType = defaultState, action: DispatchType) => {
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
