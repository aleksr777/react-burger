import {
  OPEN_MODAL_INGREDIENT_DETAILS,
  CLOSE_MODAL_INGREDIENT_DETAILS,
  SET_INGREDIENT_DETAILS,
  REMOVE_INGREDIENT_DETAILS, 
} from './ingredient-details-actions';

const defaultState = {
  ingredient: null,
  isModalOpened: false,
};

const ingredientDetailsReducer = (state = defaultState, action) => {

  switch (action.type) {

    case OPEN_MODAL_INGREDIENT_DETAILS:
      return {
        ...state,
        isModalOpened: true,
      };

    case CLOSE_MODAL_INGREDIENT_DETAILS:
      return {
        ...state,
        isModalOpened: false,
      };

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