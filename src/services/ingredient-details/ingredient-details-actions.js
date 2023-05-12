import { MODAL_ANIMATION_TIME } from '../../constants/constants';
export const INGREDIENT_DETAILS_OPEN_MODAL = 'INGREDIENT_DETAILS_OPEN_MODAL';
export const INGREDIENT_DETAILS_CLOSE_MODAL = 'INGREDIENT_DETAILS_CLOSE_MODAL';
export const INGREDIENT_DETAILS_SET_DATA = 'INGREDIENT_DETAILS_SET_DATA';
export const INGREDIENT_DETAILS_REMOVE_DATA = 'INGREDIENT_DETAILS_REMOVE_DATA';

export function openIngredientDetailsModal(ingredient) {
  return function (dispatch) {
    dispatch({ type: INGREDIENT_DETAILS_SET_DATA, payload: { ingredient: ingredient } });
    dispatch({ type: INGREDIENT_DETAILS_OPEN_MODAL, payload: {} });
  }
};

export function closeIngredientDetailsModal(goToPage) {
  return function (dispatch) {
    dispatch({ type: INGREDIENT_DETAILS_CLOSE_MODAL, payload: {} });
    setTimeout(() => {
      dispatch({ type: INGREDIENT_DETAILS_REMOVE_DATA, payload: {} });
      goToPage();
    }, MODAL_ANIMATION_TIME);
  }
};
