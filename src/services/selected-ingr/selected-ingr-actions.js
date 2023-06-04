import uniqid from 'uniqid'; /* uniqid нужен для генерации key */
import { CONSTRUCTOR_ITEMS_ANIMATION_TIME } from '../../constants/constants'
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
export const SELECTED_INGREDIENTS_ADD_ANIMATION_STATE = 'SELECTED_INGREDIENTS_ADD_ANIMATION_STATE';
export const SELECTED_INGREDIENTS_REMOVE_ANIMATION_STATE = 'SELECTED_INGREDIENTS_REMOVE_ANIMATION_STATE';


export function addIngredient(dropObj, dragObj, ingredients, counter) {
  const toIndex = ingredients.indexOf(dropObj);
  const fromIndex = ingredients.length; // все элементы ниже сместятся вниз
  const newObject = {
    ...dragObj,
    _uKey: uniqid.process(),
    locationDnd: 'ConstructorBurger',
  };
  const addIngredientPromise = new Promise((resolve) => {
    const newArr = [...ingredients.slice(0, toIndex), newObject, ...ingredients.slice(toIndex)];
    resolve(newArr);
  });

  return function (dispatch) {
    blockUserInteraction();
    dispatch({
      type: SELECTED_INGREDIENTS_ADD_ANIMATION_STATE,
      payload: {
        isItemMooving: true,
        fromIndex,
        toIndex,
        isItemAdd: true,
        isItemRemove: false,
      },
    });
    dispatch(addCount(dragObj._id, counter, 1));
    addIngredientPromise
      .then((newArr) => {
        setTimeout(() => {
          unblockUserInteraction();
          dispatch({
            type: SELECTED_INGREDIENTS_ADD_ITEM,
            payload: {
              newArr,
              price: dragObj.price,
            },
          });
          dispatch({ type: SELECTED_INGREDIENTS_REMOVE_ANIMATION_STATE, payload: {} });
        }, CONSTRUCTOR_ITEMS_ANIMATION_TIME);
      })
      .catch((error) => {
        console.error(error);
      });
  };
}


// Удаление ингридиента с вычетом цены из общей стоимости
export function removeIngredient(obj, ingredients, counter) {
  blockUserInteraction();
  const fromIndex = ingredients.indexOf(obj);
  const toIndex = ingredients.length; // все элементы ниже сместятся вверх
  const arr = ingredients.filter((ingredient) => ingredient._uKey !== obj._uKey);
  const price = obj.price;
  return function (dispatch) {
    dispatch({
      type: SELECTED_INGREDIENTS_ADD_ANIMATION_STATE, payload: {
        isItemMooving: true,
        fromIndex,
        toIndex,
        isItemAdd: false,
        isItemRemove: true,
      }
    });
    dispatch(reduceCount(obj._id, counter, 1));
    setTimeout(() => {
      unblockUserInteraction();
      dispatch({ type: SELECTED_INGREDIENTS_REMOVE_ANIMATION_STATE, payload: {} });
      dispatch({ type: SELECTED_INGREDIENTS_REMOVE_ITEM, payload: { arr, price } });
    }, CONSTRUCTOR_ITEMS_ANIMATION_TIME);
  };
};


export function swapIngredients(dropObj, dragObj, ingredients) {
  blockUserInteraction();
  const fromIndex = ingredients.indexOf(dragObj);
  const toIndex = ingredients.indexOf(dropObj);
  const swapIngredientsPromise = new Promise((resolve) => {
    const newArr = [...ingredients];
    const removedItem = newArr.splice(fromIndex, 1)[0];
    newArr.splice(toIndex, 0, removedItem);
    resolve(newArr);
  });
  return function (dispatch) {
    dispatch({
      type: SELECTED_INGREDIENTS_ADD_ANIMATION_STATE,
      payload: {
        isItemMooving: true,
        fromIndex,
        toIndex,
        isItemAdd: false,
        isItemRemove: false,
      },
    });
    swapIngredientsPromise
      .then((newArr) => {
        setTimeout(() => {
          unblockUserInteraction();
          dispatch({ type: SELECTED_INGREDIENTS_REMOVE_ANIMATION_STATE, payload: {} });
          dispatch({ type: SELECTED_INGREDIENTS_SWAP_ITEMS, payload: { newArr } });
        }, CONSTRUCTOR_ITEMS_ANIMATION_TIME);
      })
      .catch((error) => {
        console.error(error);
      });
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
}