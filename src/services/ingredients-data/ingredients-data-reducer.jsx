import {
  GET_DATA_INGREDIENTS_ERROR,
  GET_DATA_INGREDIENTS_REQUEST,
  GET_DATA_INGREDIENTS_SUCCESS,
} from './ingredients-data-actions';

const defaultState = {
  isLoading: false,
  ingredientsData: [],
};

const ingredientsDataReducer = (state = defaultState, action) => {

  switch (action.type) {

    case GET_DATA_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    };

    case GET_DATA_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsData: action.data,
        isLoading: false,
      };
    };

    case GET_DATA_INGREDIENTS_ERROR: {
      return defaultState;
    };

    default:
      return state;
  };
};

export { ingredientsDataReducer };