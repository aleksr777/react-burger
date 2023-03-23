import {
  SET_INGREDIENT_DETAILS,
  REMOVE_INGREDIENT_DETAILS
} from './ingredient-details-actions';

const defaultState = {
  ingredient: null,
  isModalOpened: false,
};

const ingredientDetailsReducer = (state = defaultState, action) => {

  switch (action.type) {

    case SET_INGREDIENT_DETAILS:
      return {
        ingredient: action.payload.ingredient,
        isModalOpened: true,
      };

    case REMOVE_INGREDIENT_DETAILS:
      return {
        ingredient: null,
        isModalOpened: false,
      };

    default:
      return state;
  }
};

export { ingredientDetailsReducer };