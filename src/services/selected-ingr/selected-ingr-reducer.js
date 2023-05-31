import { noBunObj } from '../../constants/constants';
import {
  SELECTED_INGREDIENTS_ADD_ITEM,
  SELECTED_INGREDIENTS_REMOVE_ITEM,
  SELECTED_INGREDIENTS_SWAP_ITEMS,
  SELECTED_INGREDIENTS_ADD_BUNS,
  SELECTED_INGREDIENTS_REMOVE_BUNS,
  SELECTED_INGREDIENTS_REMOVE_DATA,
  SELECTED_INGREDIENTS_ADD_ANIMATION_STATE,
  SELECTED_INGREDIENTS_REMOVE_ANIMATION_STATE,
} from './selected-ingr-actions';

const defaultState = {
  totalPrice: 0,
  bun: noBunObj,
  ingredients: [],
  animationState: {
    isItemMooving: false,
    fromIndex: null,
    toIndex: null,
    isItemAdd: false,
    isItemRemove: false,
  },
};

const selectedIngrReducer = (state = defaultState, action) => {

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

    case SELECTED_INGREDIENTS_ADD_ANIMATION_STATE:
      return {
        ...state,
        animationState: {
          isItemMooving: action.payload.isItemMooving,
          fromIndex: action.payload.fromIndex,
          toIndex: action.payload.toIndex,
          isItemAdd: action.payload.isItemAdd,
          isItemRemove: action.payload.isItemRemove,
        },
      };

    case SELECTED_INGREDIENTS_REMOVE_ANIMATION_STATE:
      return {
        ...state,
        animationState: {
          isItemMooving: false,
          fromIndex: null,
          toIndex: null,
          isItemAdd: false,
          isItemRemove: false,
        },
      };

    case SELECTED_INGREDIENTS_REMOVE_DATA:
      return defaultState;

    default:
      return state;
  };
};

export { selectedIngrReducer };