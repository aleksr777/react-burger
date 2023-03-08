import {
  GET_ORDER_ID_REQUEST,
  GET_ORDER_ID_SUCCESS,
  GET_ORDER_ID_ERROR,
  REMOVE_ORDER_ID
} from '../actions/order-id-actions';

const defaultState = {
  loadingState: false,
  id: null,
};

const orderIdReducer = (state = defaultState, action) => {

  switch (action.type) {

    case GET_ORDER_ID_REQUEST: {
      return {
        ...state,
        loadingState: true,
      };
    };

    case GET_ORDER_ID_SUCCESS:
      return {
        ...state,
        id: action.payload.id,
        loadingState: false,
      };

    case REMOVE_ORDER_ID:
      return {
        ...state,
        id: null
      };

    case GET_ORDER_ID_ERROR:
      return defaultState;

    default:
      return defaultState;
  }
};

export { orderIdReducer };