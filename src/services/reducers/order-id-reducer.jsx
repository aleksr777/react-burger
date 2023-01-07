import {
  SET_ORDER_ID,
  REMOVE_ORDER_ID
} from '../actions/order-id-actions';

const defaultState = {
  id: null
};

const orderIdReducer = (state = defaultState, action) => {

  switch (action.type) {

    case SET_ORDER_ID:
      return {
        id: action.payload.id
      };

    case REMOVE_ORDER_ID:
      return defaultState;

    default:
      return state;
  }
};

export { orderIdReducer };