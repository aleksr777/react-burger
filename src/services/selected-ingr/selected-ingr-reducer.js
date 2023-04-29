import { noBunObj } from '../../constants/constants';
import {
  SELECTED_INGREDIENTS_ADD_ITEM,
  SELECTED_INGREDIENTS_REMOVE_ITEM,
  SELECTED_INGREDIENTS_SWAP_ITEM,
  SELECTED_INGREDIENTS_ADD_BUNS,
  SELECTED_INGREDIENTS_REMOVE_BUNS,
} from './selected-ingr-actions';

const defaultState = {
  totalPrice: 0,
  bun: noBunObj,
  ingredients: [],
};

const selectedIngrReducer = (state = defaultState, action) => {

  switch (action.type) {

    case SELECTED_INGREDIENTS_ADD_ITEM:
      return {
        ...state,
        ingredients: action.payload.newArr,
        totalPrice: state.totalPrice + action.payload.price,
      };

    case SELECTED_INGREDIENTS_SWAP_ITEM:
      return {
        ...state,
        ingredients: action.payload.newArr,
      };

    case SELECTED_INGREDIENTS_REMOVE_ITEM:
      return {
        ...state,
        ingredients: action.payload.arr,
        totalPrice: state.totalPrice - action.payload.price
      };

    case SELECTED_INGREDIENTS_ADD_BUNS:
      return {
        ...state,
        bun: action.payload.bunObj,
        totalPrice: state.totalPrice + action.payload.price,
      };

    case SELECTED_INGREDIENTS_REMOVE_BUNS:
      return {
        ...state,
        bun: noBunObj,
        totalPrice: state.totalPrice - action.payload.price,
      };

    default:
      return state;
  };
};

export { selectedIngrReducer };