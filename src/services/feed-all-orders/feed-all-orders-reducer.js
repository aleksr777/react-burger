import {
  FEED_ORDERS_REQUEST,
  FEED_ORDERS_SUCCESS,
  FEED_ORDERS_SHOW_ERROR,
  FEED_ORDERS_HIDE_ERROR,
} from './feed-all-orders-actions';

const defaultState = {
  isSuccess: false,
  isLoading: false,
  isError: false,
  orders: null,
  total: null,
  totalToday: null,
};

const feedOrdersReducer = (state = defaultState, action) => {

  switch (action.type) {

    case FEED_ORDERS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    };

    case FEED_ORDERS_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        isLoading: false,
        isError: false,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };

    case FEED_ORDERS_SHOW_ERROR:
      return {
        ...state,
        isError: true,
      };

    case FEED_ORDERS_HIDE_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: false,
      };

    default:
      return state;
  }
};

export { feedOrdersReducer };