import {
  INGREDIENTS_GET_DATA_ERROR,
  INGREDIENTS_GET_DATA_REQUEST,
  INGREDIENTS_GET_DATA_SUCCESS,
  INGREDIENTS_GET_DATA_SET_DEFAULT,
} from './ingredients-data-actions';

const defaultState = {
  isLoading: false,
  isError: false,
  ingredientsData: [],
}

const ingredientsDataReducer = (state = defaultState, action) => {

  switch (action.type) {

    case INGREDIENTS_GET_DATA_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    };

    case INGREDIENTS_GET_DATA_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        ingredientsData: action.payload,
      };
    };

    case INGREDIENTS_GET_DATA_ERROR: {
      return {
        ...state,
        isError: true,
      };
    };

    case INGREDIENTS_GET_DATA_SET_DEFAULT:
      return defaultState;

    default:
      return state;
  };
};

export { ingredientsDataReducer };