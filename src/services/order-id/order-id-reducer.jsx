import {
  GET_ORDER_ID_REQUEST,
  GET_ORDER_ID_SUCCESS,
  GET_ORDER_ID_ERROR,
  REMOVE_ORDER_ID,
  OPEN_MODAL_ORDER_ID,
  CLOSE_MODAL_ORDER_ID,
  SET_DEFAULT_ORDER_ID,
} from './order-id-actions';

const defaultState = {
  isLoading: false,
  id: null,
  isModalOpened: false,
  isError: false,
  errorMessage: '',
};

const orderIdReducer = (state = defaultState, action) => {

  switch (action.type) {

    case OPEN_MODAL_ORDER_ID:
      return {
        ...state,
        isModalOpened: true,
      };

    case CLOSE_MODAL_ORDER_ID:
      return {
        ...state,
        isModalOpened: false,
      };

    case GET_ORDER_ID_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    };

    case GET_ORDER_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        id: action.payload.id,
      };

    case REMOVE_ORDER_ID:
      return {
        ...state,
        isLoading: false,
        id: null,
      };

    case GET_ORDER_ID_ERROR:
      return {
        ...state,
        isError: true,
        errorMessage: action.payload.errorMessage,
      };

    case SET_DEFAULT_ORDER_ID:
      return defaultState;

    default:
      return state;
  }
};

export { orderIdReducer };