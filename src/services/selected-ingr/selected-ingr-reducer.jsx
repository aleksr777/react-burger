import uniqid from 'uniqid'; /* uniqid нужен для генерации key */
import { noBunObj } from '../../constants/constants';
import {
  ADD_PRICE,
  REDUCE_PRICE,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SWAP_INGREDIENTS,
  ADD_BUN,
  REMOVE_BUN,
} from './selected-ingr-actions';

const initialIngrState = {
  totalPrice: 0,
  bun: noBunObj,
  ingredients: [],
};

const selectedIngrReducer = (state = initialIngrState, action) => {

  let newArr = null;
  let newObj = null;

  switch (action.type) {

    case ADD_PRICE:
      return {
        ...state,
        totalPrice: state.totalPrice + action.payload.price
      };

    case REDUCE_PRICE:
      return {
        ...state,
        totalPrice: state.totalPrice - action.payload.price
      };

    case ADD_INGREDIENT:
      newObj = { ...action.payload.ingredientObj };
      newObj._uKey = uniqid.process();
      newObj.component = 'BurgerConstructor';
      newArr = [...state.ingredients];
      newArr.splice(action.payload.toPosition, 0, newObj);
      return {
        ...state,
        ingredients: newArr,
      };

    case SWAP_INGREDIENTS:
      newObj = { ...action.payload.ingredientObj };
      newArr = [...state.ingredients];
      newArr.splice(action.payload.fromPosition, 1); /* удаляем элемент со своей позиции*/
      newArr.splice(action.payload.toPosition, 0, newObj); /* вставляем элемент в выбранную позицию */
      return {
        ...state,
        ingredients: newArr,
      };

    case REMOVE_INGREDIENT:
      newArr = state.ingredients.filter((ingredient) => ingredient._uKey !== action.payload.uKey);
      return {
        ...state,
        ingredients: newArr,
      };

    case ADD_BUN:
      return {
        ...state,
        bun: action.payload.bunObj,
      };

    case REMOVE_BUN:
      return {
        ...state,
        bun: noBunObj,
      };

    default:
      return state;
  };
};

export { selectedIngrReducer };