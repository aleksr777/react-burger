export const ADD_PRICE = 'ADD_PRICE';
export const REDUCE_PRICE = 'REDUCE_PRICE';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SWAP_INGREDIENTS = 'SWAP_INGREDIENTS';
export const ADD_BUN = 'ADD_BUN';
export const REMOVE_BUN = 'REMOVE_BUN';


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
    dispatch({ type: ADD_BUN, payload: { bunObj: bunObj, price: bunObj.price * 2 } });
  };
};

// Удаление булки с вычетом цены из общей стоимости(x2)
export function removeBun(price) {
  return function (dispatch) {
    dispatch({ type: REMOVE_BUN, payload: { price: price * 2 } });
  };
};