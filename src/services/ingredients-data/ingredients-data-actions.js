import { requestGetIngredientsDataServer } from '../../utils/api';
import {
  blockUserInteraction,
  unblockUserInteraction,
} from '../block-user-interaction-service/block-user-interaction-service';
import { LOADER_ANIMATION_TIME } from '../../constants/constants';
import {
  INGREDIENT_DETAILS_SET_DATA,
  INGREDIENT_DETAILS_REMOVE_DATA,
} from '../ingredient-details/ingredient-details-actions';

export const INGREDIENTS_DATA_REQUEST = 'INGREDIENTS_DATA_REQUEST';
export const INGREDIENTS_DATA_SUCCESS = 'INGREDIENTS_DATA_SUCCESS';
export const INGREDIENTS_DATA_ERROR = 'INGREDIENTS_DATA_ERROR';
export const INGREDIENTS_DATA_SET_DEFAULT = 'INGREDIENTS_DATA_SET_DEFAULT';

// Получение информации обо всех ингредиентах
export function requestGetIngredientsData() {

  return function (dispatch) {

    function handleError(response) {
      console.log(response);
      dispatch({ type: INGREDIENTS_DATA_ERROR, payload: {} });
      setTimeout(() => {
        unblockUserInteraction();
        dispatch({ type: INGREDIENTS_DATA_SET_DEFAULT, payload: {} });
      }, 2000);
    }

    dispatch({ type: INGREDIENTS_DATA_REQUEST, payload: {} });
    blockUserInteraction();

    requestGetIngredientsDataServer()
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: INGREDIENTS_DATA_SUCCESS, payload: { data: res.data }
          });
          setTimeout(() => { unblockUserInteraction() }, LOADER_ANIMATION_TIME);
        }
        else {
          handleError(res);
        };
      })
      .catch(err => {
        handleError(err);
      });
  };
};


// Получение информации об ингредиенте
export function getIngredientInfo(goToNotFoundPage, id, path) {

  return function (dispatch) {

    function handleError(response) {
      console.log(response);
      dispatch({ type: INGREDIENTS_DATA_ERROR, payload: {} });
      setTimeout(() => {
        unblockUserInteraction();
        dispatch({ type: INGREDIENTS_DATA_SET_DEFAULT, payload: {} });
        dispatch({ type: INGREDIENT_DETAILS_REMOVE_DATA, payload: {} });
        goToNotFoundPage();
      }, 2000);
    }

    // Приходится запрашивать все ингредиенты, так как нет эндпоинта для отдельного компонента.
    dispatch({ type: INGREDIENTS_DATA_REQUEST, payload: {} });
    dispatch({ type: INGREDIENT_DETAILS_REMOVE_DATA, payload: {} });
    blockUserInteraction();

    requestGetIngredientsDataServer()
      .then(res => {
        if (res && res.success) {
          unblockUserInteraction();
          dispatch({
            type: INGREDIENTS_DATA_SUCCESS, payload: { data: res.data }
          });
          const [ingredient] = res.data.filter((obj) => obj._id === id);
          if (ingredient) {
            dispatch({
              type: INGREDIENT_DETAILS_SET_DATA,
              payload: {
                ingredient: {
                  ...ingredient,
                  path: path
                },
              }
            })
          }
          else {
            dispatch({ type: INGREDIENT_DETAILS_REMOVE_DATA, payload: {} });
            goToNotFoundPage();
          }
        }
        else {
          handleError(res);
        };
      })
      .catch(err => {
        handleError(err);
      });
  };
};
