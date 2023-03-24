import {
  GET_ORDER_ID_REQUEST,
  GET_ORDER_ID_SUCCESS,
  GET_ORDER_ID_ERROR,
  REMOVE_ORDER_ID
} from './order-id-actions';

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
        loadingState: false,
        id: action.payload.id,
      };

    case GET_ORDER_ID_ERROR:
      return defaultState;

    case REMOVE_ORDER_ID:
      return {
        ...state,
        loadingState: false,
        id: null,
      };

    default:
      return state;
  }
};

export { orderIdReducer };