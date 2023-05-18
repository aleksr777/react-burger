import {
  PROFILE_ORDERS_REQUEST,
  PROFILE_ORDERS_SUCCESS,
  PROFILE_ORDERS_SHOW_ERROR,
  PROFILE_ORDERS_HIDE_ERROR,
} from './profile-orders-actions';

const defaultState = {
  isSuccess: false,
  isLoading: false,
  isError: false,
  orders: null,
};

const profileOrdersReducer = (state = defaultState, action) => {

  switch (action.type) {

    case PROFILE_ORDERS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    };

    case PROFILE_ORDERS_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        isLoading: false,
        isError: false,
        orders: action.payload.orders,
      };

    case PROFILE_ORDERS_SHOW_ERROR:
      return {
        ...state,
        isError: true,
      };

    case PROFILE_ORDERS_HIDE_ERROR:
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