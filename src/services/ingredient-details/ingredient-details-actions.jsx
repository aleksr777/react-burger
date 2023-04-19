import { MODAL_ANIMATION_TIME } from '../../constants/constants';
export const OPEN_MODAL_INGREDIENT_DETAILS = 'OPEN_MODAL_INGREDIENT_DETAILS';
export const CLOSE_MODAL_INGREDIENT_DETAILS = 'CLOSE_MODAL_INGREDIENT_DETAILS';
export const SET_INGREDIENT_DETAILS = 'SET_INGREDIENT_DETAILS';
export const REMOVE_INGREDIENT_DETAILS = 'REMOVE_INGREDIENT_DETAILS';

export function openIngredientDetailsModal(ingredient) {
  return function (dispatch) {
    dispatch({ type: SET_INGREDIENT_DETAILS, payload: { ingredient: ingredient } });
    dispatch({ type: OPEN_MODAL_INGREDIENT_DETAILS, payload: {} });
  }
};

export function closeIngredientDetailsModal() {
  return function (dispatch) {
    dispatch({ type: CLOSE_MODAL_INGREDIENT_DETAILS, payload: {} });
    setTimeout(() => {
      dispatch({ type: REMOVE_INGREDIENT_DETAILS, payload: {} });
    }, MODAL_ANIMATION_TIME);
  }
};
