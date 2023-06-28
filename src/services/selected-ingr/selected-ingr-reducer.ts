import { noBunObj } from '../../constants/constants';
import {
  SELECTED_INGREDIENTS_ADD_ITEM,
  SELECTED_INGREDIENTS_REMOVE_ITEM,
  SELECTED_INGREDIENTS_SWAP_ITEMS,
  SELECTED_INGREDIENTS_ADD_BUNS,
  SELECTED_INGREDIENTS_REMOVE_BUNS,
  SELECTED_INGREDIENTS_REMOVE_DATA,
} from './selected-ingr-actions';

import { SelectedIngredientType, IngredientInfoType } from '../../types/types';

type StateType = {
  totalPrice: number;
  bun: IngredientInfoType;
  ingredients: SelectedIngredientType[];
};

const defaultState: StateType = {
  totalPrice: 0,
  bun: noBunObj,
  ingredients: [],
};

const selectedIngrReducer = (state: StateType = defaultState, action: any) => {
  switch (action.type) {
    case SELECTED_INGREDIENTS_ADD_ITEM:
      return {
        ...state,
        ingredients: action.payload.newArr,
        totalPrice: state.totalPrice + action.payload.price,
      };

    case SELECTED_INGREDIENTS_SWAP_ITEMS:
      return {
        ...state,
        ingredients: action.payload.newArr,
      };

    case SELECTED_INGREDIENTS_REMOVE_ITEM:
      return {
        ...state,
        ingredients: action.payload.arr,
        totalPrice: state.totalPrice - action.payload.price,
      };

    case SELECTED_INGREDIENTS_ADD_BUNS:
      return {
        ...state,
        bun: action.payload.dragObj,
        totalPrice: state.totalPrice + action.payload.price,
      };

    case SELECTED_INGREDIENTS_REMOVE_BUNS:
      return {
        ...state,
        bun: noBunObj,
        totalPrice: state.totalPrice - action.payload.price,
      };

    case SELECTED_INGREDIENTS_REMOVE_DATA:
      return defaultState;

    default:
      return state;
  }
};

export { selectedIngrReducer };
