import {
  GET_ORDER_ID_REQUEST,
  GET_ORDER_ID_SUCCESS,
  GET_ORDER_ID_ERROR,
  REMOVE_ORDER_ID
} from './order-id-actions';

const defaultState = {
  loadingState: false,
  id: null,
  isModalOpened: false,
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
        isModalOpened: true,
      };

    case GET_ORDER_ID_ERROR:
      return defaultState;

    case REMOVE_ORDER_ID:
      return {
        ...state,
        id: null,
        isModalOpened: false,
      };

    default:
      return state;
  }
};

export { orderIdReducer };