import uniqid from 'uniqid'; /* uniqid нужен для генерации key */
import { noBunObj } from '../../constants/constants';
import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  ADD_BUN,
  REMOVE_BUN,
} from '../actions/selected-ingr-actions';

const initialIngrState = {
  totalPrice: 0,
  bun: noBunObj,
  ingredients: [],
};

const selectedIngrReducer = (state = initialIngrState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      const newObj = { ...action.payload.ingredientObj };
      newObj._uKey = uniqid.process();
      return {
        ...state,
        totalPrice: state.totalPrice + newObj.price,
        ingredients: [...state.ingredients, newObj],
      };
    case REMOVE_INGREDIENT:
      const newArr = state.ingredients.filter((ingredient) => ingredient._uKey !== action.payload.uKey);
      return {
        ...state,
        totalPrice: state.totalPrice - action.payload.price,
        ingredients: newArr,
      };
    case ADD_BUN:
      return {
        ...state,
        totalPrice: state.totalPrice + (action.payload.bunObj.price * 2),
        bun: action.payload.bunObj,
      };
    case REMOVE_BUN:
      return {
        ...state,
        totalPrice: state.totalPrice - (action.payload.price * 2),
        bun: noBunObj,
      };
    default:
      return state;
  }
};

export { selectedIngrReducer };