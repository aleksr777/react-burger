import uniqid from 'uniqid'; /* uniqid нужен для генерации key */
import {
  blockUserInteraction,
  unblockUserInteraction,
} from '../block-user-interaction-service/block-user-interaction-service';
import { addCount, reduceCount, addAndReduceCount } from '../counter/counter-actions';
import { DispatchFuncType, IngredientInfoType, CounterType } from '../../types/types';
import { SelectedIngrActionsType } from '../../types/selected-ingr-types';

export const SELECTED_INGREDIENTS_ADD_ITEM: SelectedIngrActionsType =
  'SELECTED_INGREDIENTS_ADD_ITEM';
export const SELECTED_INGREDIENTS_REMOVE_ITEM: SelectedIngrActionsType =
  'SELECTED_INGREDIENTS_REMOVE_ITEM';
export const SELECTED_INGREDIENTS_SWAP_ITEMS: SelectedIngrActionsType =
  'SELECTED_INGREDIENTS_SWAP_ITEMS';
export const SELECTED_INGREDIENTS_ADD_BUNS: SelectedIngrActionsType =
  'SELECTED_INGREDIENTS_ADD_BUNS';
export const SELECTED_INGREDIENTS_REMOVE_BUNS: SelectedIngrActionsType =
  'SELECTED_INGREDIENTS_REMOVE_BUNS';
export const SELECTED_INGREDIENTS_REMOVE_DATA: SelectedIngrActionsType =
  'SELECTED_INGREDIENTS_REMOVE_DATA';

export function addIngredient(
  dropObj: IngredientInfoType,
  dragObj: IngredientInfoType,
  ingredients: IngredientInfoType[],
  counter: CounterType
): DispatchFuncType {
  const toIndex: number = ingredients.indexOf(dropObj);
  const newObject: IngredientInfoType = {
    ...dragObj,
    _uKey: uniqid.process(),
    locationDnd: 'ConstructorBurger',
  };
  const getNewArr = async (ingredients: IngredientInfoType[]) => {
    const newArr: IngredientInfoType[] = [
      ...ingredients.slice(0, toIndex),
      newObject,
      ...ingredients.slice(toIndex),
    ];
    return newArr;
  };
  return async function (dispatch) {
    blockUserInteraction();
    dispatch(addCount(dragObj._id, counter, 1));
    const newArr = await getNewArr(ingredients);
    unblockUserInteraction();
    dispatch({
      type: SELECTED_INGREDIENTS_ADD_ITEM,
      payload: { arr: newArr, price: dragObj.price },
    });
  };
}

export function removeIngredient(
  obj: IngredientInfoType,
  ingredients: IngredientInfoType[],
  counter: CounterType
): DispatchFuncType {
  blockUserInteraction();
  const arr: IngredientInfoType[] = ingredients.filter(
    (ingredient: IngredientInfoType) => ingredient._uKey !== obj._uKey
  );
  const price: number = obj.price;
  return function (dispatch) {
    dispatch(reduceCount(obj._id, counter, 1));
    unblockUserInteraction();
    dispatch({ type: SELECTED_INGREDIENTS_REMOVE_ITEM, payload: { arr: arr, price: price } });
  };
}

export function swapIngredients(
  dropObj: IngredientInfoType,
  dragObj: IngredientInfoType,
  ingredients: IngredientInfoType[]
): DispatchFuncType {
  blockUserInteraction();
  const fromIndex: number = ingredients.indexOf(dragObj);
  const toIndex: number = ingredients.indexOf(dropObj);

  const getNewArr = async (ingredients: IngredientInfoType[]) => {
    const newArr: IngredientInfoType[] = [...ingredients];
    const removedItem: IngredientInfoType = newArr.splice(fromIndex, 1)[0];
    newArr.splice(toIndex, 0, removedItem);
    return newArr;
  };
  return async function (dispatch) {
    const newArr: IngredientInfoType[] = await getNewArr(ingredients);
    unblockUserInteraction();
    dispatch({ type: SELECTED_INGREDIENTS_SWAP_ITEMS, payload: { arr: newArr } });
  };
}

// Добавление булки с прибавлением цены к общей стоимости(x2)
export function addBun(
  dropObj: IngredientInfoType,
  dragObj: IngredientInfoType,
  counter: CounterType
): DispatchFuncType {
  let price = 0;
  return async function (dispatch) {
    if (!dropObj._id) {
      price = dragObj.price * 2;
      dispatch({
        type: SELECTED_INGREDIENTS_ADD_BUNS,
        payload: { dragObj: dragObj, price: price },
      });
      dispatch(addCount(dragObj._id, counter, 2));
    } else if (dropObj._id !== dragObj._id) {
      price = dragObj.price * 2 - dropObj.price * 2;
      dispatch({
        type: SELECTED_INGREDIENTS_ADD_BUNS,
        payload: { dragObj: dragObj, price: price },
      });
      dispatch(addAndReduceCount(dragObj._id, dropObj._id, counter, 2));
    }
  };
}
