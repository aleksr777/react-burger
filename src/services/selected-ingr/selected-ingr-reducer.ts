import { noBunObj } from '../../constants/constants';
import {
  SELECTED_INGREDIENTS_ADD_ITEM,
  SELECTED_INGREDIENTS_REMOVE_ITEM,
  SELECTED_INGREDIENTS_SWAP_ITEMS,
  SELECTED_INGREDIENTS_ADD_BUNS,
  SELECTED_INGREDIENTS_REMOVE_BUNS,
  SELECTED_INGREDIENTS_REMOVE_DATA,
} from './selected-ingr-actions';

import { SelectedIngrStateType, SelectedIngrDispatchType } from '../../types/selected-ingr-types';

const defaultState: SelectedIngrStateType = {
  totalPrice: 0,
  bun: noBunObj,
  ingredients: [],
};

const selectedIngrReducer = (
  state: SelectedIngrStateType = defaultState,
  action: SelectedIngrDispatchType
) => {
  switch (action.type) {
    case SELECTED_INGREDIENTS_ADD_ITEM:
      return {
        ...state,
        ingredients: action.payload.arr,
        totalPrice: state.totalPrice + action.payload.price,
      };

    case SELECTED_INGREDIENTS_SWAP_ITEMS:
      return {
        ...state,
        ingredients: action.payload.arr,
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
