import uniqid from 'uniqid'; /* uniqid нужен для генерации key */

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SWAP_INGREDIENTS = 'SWAP_INGREDIENTS';
export const ADD_BUN = 'ADD_BUN';
export const REMOVE_BUN = 'REMOVE_BUN';


// Добавление ингредиента с прибавлением цены к общей стоимости
export function addIngredient(ingredientObj, toPosition, ingredientsArr) {
  let newObj = { ...ingredientObj };
  let newArr = [...ingredientsArr];
  newObj._uKey = uniqid.process();
  newObj.locationDnd = 'ConstructorBurger'; /* нужно для логики DnD */
  newArr.splice(toPosition, 0, newObj);
  return function (dispatch) {
    dispatch({
      type: ADD_INGREDIENT,
      payload: {
        newArr,
        price: ingredientObj.price,
      }
    });
  };
};

// Удаление ингридиента с вычетом цены из общей стоимости
export function removeIngredient(uKey, price, ingredients) {
  const arr = ingredients.filter((ingredient) => ingredient._uKey !== uKey);
  return function (dispatch) {
    dispatch({ type: REMOVE_INGREDIENT, payload: { arr, price } });
  };
};

// Добавление булки с прибавлением цены к общей стоимости(x2)
export function addBun(bunObj) {
  return function (dispatch) {
    dispatch({ type: ADD_BUN, payload: { bunObj, price: bunObj.price * 2 } });
  };
};

// Удаление булки с вычетом цены из общей стоимости(x2)
export function removeBun(price) {
  return function (dispatch) {
    dispatch({ type: REMOVE_BUN, payload: { price: price * 2 } });
  };
};

// Изменение позиции ингридиента в списке при перетаскивании
export function swapIngredients(dragObj, fromPosition, toPosition, ingredients) {
  let newObj = { ...dragObj };
  let newArr = [...ingredients];
  newArr.splice(fromPosition, 1); /* удаляем элемент со своей позиции*/
  newArr.splice(toPosition, 0, newObj); /* вставляем элемент в выбранную позицию */
  return function (dispatch) {
    dispatch({ type: SWAP_INGREDIENTS, payload: { newArr } });
  };
};