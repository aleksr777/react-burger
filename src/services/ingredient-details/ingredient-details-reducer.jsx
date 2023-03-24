import {
  SET_INGREDIENT_DETAILS,
  REMOVE_INGREDIENT_DETAILS
} from './ingredient-details-actions';

const defaultState = {
  ingredient: null
};

const ingredientDetailsReducer = (state = defaultState, action) => {

  switch (action.type) {

    case SET_INGREDIENT_DETAILS:
      return {
        ...state,
        ingredient: action.payload.ingredient
      };

    case REMOVE_INGREDIENT_DETAILS:
      return {
        ...state,
        ingredient: null
      };

    default:
      return state;
  }
};

export { ingredientDetailsReducer };