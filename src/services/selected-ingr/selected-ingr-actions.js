import uniqid from 'uniqid'; /* uniqid нужен для генерации key */
import { CONSTRUCTOR_ITEMS_ANIMATION_TIME } from '../../constants/constants'
import {
  blockUserInteraction,
  unblockUserInteraction,
} from '../block-user-interaction-service/block-user-interaction-service';

export const SELECTED_INGREDIENTS_ADD_ITEM = 'SELECTED_INGREDIENTS_ADD_ITEM';
export const SELECTED_INGREDIENTS_REMOVE_ITEM = 'SELECTED_INGREDIENTS_REMOVE_ITEM';
export const SELECTED_INGREDIENTS_SWAP_ITEMS = 'SELECTED_INGREDIENTS_SWAP_ITEMS';
export const SELECTED_INGREDIENTS_ADD_BUNS = 'SELECTED_INGREDIENTS_ADD_BUNS';
export const SELECTED_INGREDIENTS_REMOVE_BUNS = 'SELECTED_INGREDIENTS_REMOVE_BUNS';
export const SELECTED_INGREDIENTS_REMOVE_DATA = 'SELECTED_INGREDIENTS_REMOVE_DATA';
export const SELECTED_INGREDIENTS_ADD_ANIMATION_STATE = 'SELECTED_INGREDIENTS_ADD_ANIMATION_STATE';
export const SELECTED_INGREDIENTS_REMOVE_ANIMATION_STATE = 'SELECTED_INGREDIENTS_REMOVE_ANIMATION_STATE';


export function addIngredient(dropObj, dragObj, ingredients) {

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

    addIngredientPromise
      .then((newArr) => {
        setTimeout(() => {
          dispatch({
            type: SELECTED_INGREDIENTS_ADD_ITEM,
            payload: {
              newArr,
              price: dragObj.price,
            },
          });
          dispatch({ type: SELECTED_INGREDIENTS_REMOVE_ANIMATION_STATE, payload: {} });
          unblockUserInteraction();
        }, CONSTRUCTOR_ITEMS_ANIMATION_TIME);
      })
      .catch((error) => {
        console.error(error);
      });
  };
}


// Удаление ингридиента с вычетом цены из общей стоимости
export function removeIngredient(obj, ingredients) {

  /* animationState.fromIndex < indexItem && animationState.toIndex >= indexItem */
  const fromIndex = ingredients.indexOf(obj);
  const toIndex = ingredients.length;

  const arr = ingredients.filter((ingredient) => ingredient._uKey !== obj._uKey);
  const price = obj.price;

  return function (dispatch) {

    blockUserInteraction();

    dispatch({
      type: SELECTED_INGREDIENTS_ADD_ANIMATION_STATE, payload: {
        isItemMooving: true,
        fromIndex,
        toIndex,
        isItemAdd: false,
        isItemRemove: true,
      }
    });
    setTimeout(() => {
      dispatch({ type: SELECTED_INGREDIENTS_REMOVE_ANIMATION_STATE, payload: {} });
      dispatch({ type: SELECTED_INGREDIENTS_REMOVE_ITEM, payload: { arr, price } });
      unblockUserInteraction();
    }, CONSTRUCTOR_ITEMS_ANIMATION_TIME);
  };
};


// Добавление булки с прибавлением цены к общей стоимости(x2)
export function addBun(bunObj) {
  return function (dispatch) {
    dispatch({ type: SELECTED_INGREDIENTS_ADD_BUNS, payload: { bunObj, price: bunObj.price * 2 } });
  };
};


// Удаление булки с вычетом цены из общей стоимости(x2)
export function removeBun(price) {
  return function (dispatch) {
    dispatch({ type: SELECTED_INGREDIENTS_REMOVE_BUNS, payload: { price: price * 2 } });
  };
};


export function swapIngredients(dropObj, dragObj, ingredients) {
  const fromIndex = ingredients.indexOf(dragObj);
  const toIndex = ingredients.indexOf(dropObj);

  const swapIngredientsPromise = new Promise((resolve) => {
    const newArr = [...ingredients];
    const removedItem = newArr.splice(fromIndex, 1)[0];
    newArr.splice(toIndex, 0, removedItem);
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
        isItemAdd: false,
        isItemRemove: false,
      },
    });

    swapIngredientsPromise
      .then((newArr) => {
        setTimeout(() => {
          dispatch({ type: SELECTED_INGREDIENTS_REMOVE_ANIMATION_STATE, payload: {} });
          dispatch({ type: SELECTED_INGREDIENTS_SWAP_ITEMS, payload: { newArr } }); 
          unblockUserInteraction();
        }, CONSTRUCTOR_ITEMS_ANIMATION_TIME);
      })
      .catch((error) => {
        console.error(error);
      });
  };
}

