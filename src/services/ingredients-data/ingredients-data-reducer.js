import {
  INGREDIENTS_DATA_ERROR,
  INGREDIENTS_DATA_REQUEST,
  INGREDIENTS_DATA_SUCCESS,
  INGREDIENTS_DATA_SET_DEFAULT,
} from './ingredients-data-actions';

const defaultState = {
  isLoading: false,
  ingredientsData: [],
  isError: {
    state: false,
    title: 'Ошибка сервера',
    message: '',
  },
}

const ingredientsDataReducer = (state = defaultState, action) => {

  switch (action.type) {

    case INGREDIENTS_DATA_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    };

    case INGREDIENTS_DATA_SUCCESS: {
      return {
        ...state,
        ingredientsData: action.data,
        isLoading: false,
      };
    };

    case INGREDIENTS_DATA_ERROR: {
      return {
        ...state,
        isError: {
          ...state.isError,
          state: true,
          message: `[${action.payload.message}]`,
        },
      };
    };

    case INGREDIENTS_DATA_SET_DEFAULT:
      return defaultState;

    default:
      return state;
  };
};

export { ingredientsDataReducer };