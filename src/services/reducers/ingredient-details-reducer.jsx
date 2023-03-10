import {
  SET_INGREDIENT_DETAILS,
  REMOVE_INGREDIENT_DETAILS
} from '../actions/ingredient-details-actions';

const defaultState = {
  ingredient: null
};

const ingredientDetailsReducer = (state = defaultState, action) => {

  switch (action.type) {

    case SET_INGREDIENT_DETAILS:
      return {
        ingredient: action.payload.ingredient
      };

    case REMOVE_INGREDIENT_DETAILS:
      return {
        ingredient: null
      };

    default:
      return state;
  }
};

export { ingredientDetailsReducer };