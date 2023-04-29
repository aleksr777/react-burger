import {
  ORDER_ID_REQUEST,
  ORDER_ID_SUCCESS,
  ORDER_ID_ERROR,
  ORDER_ID_REMOVE,
  ORDER_ID_OPEN_MODAL,
  ORDER_ID_CLOSE_MODAL,
  ORDER_ID_SET_DEFAULT,
} from './order-id-actions';

const defaultState = {
  id: null,
  isLoading: false,
  isModalOpened: false,
  isError: {
    state: false,
    title: 'Ошибка запроса к серверу',
    message: '',
  },
};

const orderIdReducer = (state = defaultState, action) => {

  switch (action.type) {

    case ORDER_ID_OPEN_MODAL:
      return {
        ...state,
        isModalOpened: true,
      };

    case ORDER_ID_CLOSE_MODAL:
      return {
        ...state,
        isModalOpened: false,
      };

    case ORDER_ID_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    };

    case ORDER_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        id: action.payload.id,
      };

    case ORDER_ID_REMOVE:
      return {
        ...state,
        isLoading: false,
        id: null,
      };

    case ORDER_ID_ERROR:
      return {
        ...state,
        isError: {
          ...state.isError,
          state: true,
          message: `[${action.payload.message}]`,
        },
      };

    case ORDER_ID_SET_DEFAULT:
      return defaultState;

    default:
      return state;
  }
};

export { orderIdReducer };