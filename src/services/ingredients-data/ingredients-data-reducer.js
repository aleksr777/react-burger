import {
  INGREDIENTS_DATA_ERROR,
  INGREDIENTS_DATA_REQUEST,
  INGREDIENTS_DATA_SUCCESS,
  INGREDIENTS_DATA_SET_DEFAULT,
  INGREDIENTS_SET_INGREDIENT_INFO,
  INGREDIENTS_REMOVE_INGREDIENT_INFO,
} from './ingredients-data-actions';

const defaultState = {
  isLoading: false,
  ingredientsData: [],
  ingredientInfo: null,
  isError: false,
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
        ingredientsData: action.payload.data,
        isLoading: false,
        isError: false,
      };
    };

    case INGREDIENTS_SET_INGREDIENT_INFO: {
      return {
        ...state,
        ingredientInfo: action.payload.ingredientInfo,
      };
    };

    case INGREDIENTS_REMOVE_INGREDIENT_INFO: {
      return {
        ...state,
        ingredientInfo: null,
      };
    };

    case INGREDIENTS_DATA_ERROR: {
      return {
        ...state,
        isError: true,
      };
    };

    case INGREDIENTS_DATA_SET_DEFAULT:
      return defaultState;

    default:
      return state;
  };
};

export { ingredientsDataReducer };