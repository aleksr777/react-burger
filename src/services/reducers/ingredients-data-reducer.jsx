import {
  GET_DATA_INGREDIENTS_ERROR,
  GET_DATA_INGREDIENTS_REQUEST,
  GET_DATA_INGREDIENTS_SUCCESS,
} from '../actions/ingredients-data-actions';

const defaultState = {
  loadingState: false,
  ingredientsData: [],
};

const ingredientsDataReducer = (state = defaultState, action) => {

  switch (action.type) {

    case GET_DATA_INGREDIENTS_REQUEST: {
      return {
        ...state,
        loadingState: true,
      };
    };

    case GET_DATA_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsData: action.data,
        loadingState: false,
      };
    };

    case GET_DATA_INGREDIENTS_ERROR: {
      return defaultState;
    };

    default:
      return defaultState;
  };
};

export { ingredientsDataReducer };