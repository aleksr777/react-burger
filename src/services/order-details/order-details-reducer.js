import {
  ORDER_DETAILS_OPEN_MODAL,
  ORDER_DETAILS_CLOSE_MODAL,
  ORDER_DETAILS_SET_DATA,
  ORDER_DETAILS_REMOVE_DATA,
} from './order-details-actions';

const defaultState = {
  order: null,
  isModalOpened: false,
};

const orderDetailsReducer = (state = defaultState, action) => {

  switch (action.type) {

    case ORDER_DETAILS_OPEN_MODAL:
      return {
        ...state,
        isModalOpened: true,
      };

    case ORDER_DETAILS_CLOSE_MODAL:
      return {
        ...state,
        isModalOpened: false,
      };

    case ORDER_DETAILS_SET_DATA:
      return {
        ...state,
        order: action.payload.order
      };

    case ORDER_DETAILS_REMOVE_DATA:
      return {
        ...state,
        order: null
      };

    default:
      return state;
  }
};

export { orderDetailsReducer };