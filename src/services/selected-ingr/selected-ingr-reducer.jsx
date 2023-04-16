import { noBunObj } from '../../constants/constants';
import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SWAP_INGREDIENTS,
  ADD_BUN,
  REMOVE_BUN,
} from './selected-ingr-actions';

const defaultState = {
  totalPrice: 0,
  bun: noBunObj,
  ingredients: [],
};

const selectedIngrReducer = (state = defaultState, action) => {

  switch (action.type) {

    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: action.payload.newArr,
        totalPrice: state.totalPrice + action.payload.price,
      };

    case SWAP_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload.newArr,
      };

    case REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: action.payload.arr,
        totalPrice: state.totalPrice - action.payload.price
      };

    case ADD_BUN:
      return {
        ...state,
        bun: action.payload.bunObj,
        totalPrice: state.totalPrice + action.payload.price,
      };

    case REMOVE_BUN:
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