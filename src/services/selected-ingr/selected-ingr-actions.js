import uniqid from 'uniqid'; /* uniqid нужен для генерации key */
import {
  blockUserInteraction,
  unblockUserInteraction,
} from '../block-user-interaction-service/block-user-interaction-service';
import { addCount, reduceCount, addAndReduceCount } from '../../services/counter/counter-actions';

export const SELECTED_INGREDIENTS_ADD_ITEM = 'SELECTED_INGREDIENTS_ADD_ITEM';
export const SELECTED_INGREDIENTS_REMOVE_ITEM = 'SELECTED_INGREDIENTS_REMOVE_ITEM';
export const SELECTED_INGREDIENTS_SWAP_ITEMS = 'SELECTED_INGREDIENTS_SWAP_ITEMS';
export const SELECTED_INGREDIENTS_ADD_BUNS = 'SELECTED_INGREDIENTS_ADD_BUNS';
export const SELECTED_INGREDIENTS_REMOVE_BUNS = 'SELECTED_INGREDIENTS_REMOVE_BUNS';
export const SELECTED_INGREDIENTS_REMOVE_DATA = 'SELECTED_INGREDIENTS_REMOVE_DATA';


export function addIngredient(dropObj, dragObj, ingredients, counter) {
  const toIndex = ingredients.indexOf(dropObj);
  const newObject = {
    ...dragObj,
    _uKey: uniqid.process(),
    locationDnd: 'ConstructorBurger',
  };
  const getNewArr = async (ingredients) => {
    const newArr = [...ingredients.slice(0, toIndex), newObject, ...ingredients.slice(toIndex)];
    return newArr;
  };
  return async function (dispatch) {
    blockUserInteraction();
    dispatch(addCount(dragObj._id, counter, 1));
    const newArr = await getNewArr(ingredients);
    unblockUserInteraction();
    dispatch({
      type: SELECTED_INGREDIENTS_ADD_ITEM,
      payload: {
        newArr,
        price: dragObj.price,
      },
    });
  };
};


export function removeIngredient(obj, ingredients, counter) {
  blockUserInteraction();
  const arr = ingredients.filter((ingredient) => ingredient._uKey !== obj._uKey);
  const price = obj.price;
  return function (dispatch) {
    dispatch(reduceCount(obj._id, counter, 1));
    unblockUserInteraction();
    dispatch({ type: SELECTED_INGREDIENTS_REMOVE_ITEM, payload: { arr, price } });
  };
};


export function swapIngredients(dropObj, dragObj, ingredients) {
  blockUserInteraction();
  const fromIndex = ingredients.indexOf(dragObj);
  const toIndex = ingredients.indexOf(dropObj);

  const getNewArr = async (ingredients) => {
    const newArr = [...ingredients];
    const removedItem = newArr.splice(fromIndex, 1)[0];
    newArr.splice(toIndex, 0, removedItem);
    return newArr;
  };
  return async function (dispatch) {
    const newArr = await getNewArr(ingredients);
    unblockUserInteraction();
    dispatch({ type: SELECTED_INGREDIENTS_SWAP_ITEMS, payload: { newArr } });
  };
};


// Добавление булки с прибавлением цены к общей стоимости(x2)
export function addBun(dropObj, dragObj, counter) {
  let price = 0;
  return async function (dispatch) {
    if (!dropObj._id) {
      price = dragObj.price * 2;
      dispatch({ type: SELECTED_INGREDIENTS_ADD_BUNS, payload: { dragObj, price } });
      dispatch(addCount(dragObj._id, counter, 2));
    }
    else if (dropObj._id !== dragObj._id) {
      price = (dragObj.price * 2) - (dropObj.price * 2);
      dispatch({ type: SELECTED_INGREDIENTS_ADD_BUNS, payload: { dragObj, price } });
      dispatch(addAndReduceCount(dragObj._id, dropObj._id, counter, 2));
    }
  };
};