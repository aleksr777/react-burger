import {
  INGREDIENT_DETAILS_OPEN_MODAL,
  INGREDIENT_DETAILS_CLOSE_MODAL,
  INGREDIENT_DETAILS_SET_DATA,
  INGREDIENT_DETAILS_REMOVE_DATA,
} from './ingredient-details-actions'

import { IngredientInfoType } from '../../types/types';

type StateType = {
  ingredient: IngredientInfoType | null;
  isModalOpened: boolean;
};

const defaultState: StateType = {
  ingredient: null,
  isModalOpened: false,
};

const ingredientDetailsReducer = ( state: StateType = defaultState, action: any ) => {

  switch ( action.type ) {
    
    case INGREDIENT_DETAILS_OPEN_MODAL:
      return {
        ...state,
        isModalOpened: true,
      };

    case INGREDIENT_DETAILS_CLOSE_MODAL:
      return {
        ...state,
        isModalOpened: false,
      };

    case INGREDIENT_DETAILS_SET_DATA:
      return {
        ...state,
        ingredient: action.payload.ingredient,
      };

    case INGREDIENT_DETAILS_REMOVE_DATA:
      return {
        ...state,
        ingredient: null,
      };

    default:
      return state;
  }
};

export { ingredientDetailsReducer }