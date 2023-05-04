import { getIngredientsDataServer } from '../../utils/api';

export const INGREDIENTS_DATA_REQUEST = 'INGREDIENTS_DATA_REQUEST';
export const INGREDIENTS_DATA_SUCCESS = 'INGREDIENTS_DATA_SUCCESS';
export const INGREDIENTS_SET_INGREDIENT_INFO = 'INGREDIENTS_SET_INGREDIENT_INFO';
export const INGREDIENTS_REMOVE_INGREDIENT_INFO = 'INGREDIENTS_REMOVE_INGREDIENT_INFO';
export const INGREDIENTS_DATA_ERROR = 'INGREDIENTS_DATA_ERROR';
export const INGREDIENTS_DATA_SET_DEFAULT = 'INGREDIENTS_DATA_SET_DEFAULT';

export function getIngredientsData() {

  return function (dispatch) {

    function handleError(response) {
      console.log(response);
      dispatch({ type: INGREDIENTS_DATA_ERROR, payload: { message: response } });
      setTimeout(() => {
        dispatch({ type: INGREDIENTS_DATA_SET_DEFAULT, payload: {} });
      }, 2000);
    }

    dispatch({ type: INGREDIENTS_DATA_REQUEST, payload: {} });

    getIngredientsDataServer()
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: INGREDIENTS_DATA_SUCCESS, payload: { data: res.data }
          });
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


/* Получение информации об ингредиенте */
export function getIngredientInfo(navigate, id, path) {

  return function (dispatch) {

    function handleError(response) {
      console.log(response);
      dispatch({ type: INGREDIENTS_REMOVE_INGREDIENT_INFO, payload: {} });
      navigate('/404', { replace: true });
    }

    /* Приходится запрашивать все ингредиенты, так как нет эндпоинта для отдельного компонента.*/
    dispatch({ type: INGREDIENTS_DATA_REQUEST, payload: {} });
    dispatch({ type: INGREDIENTS_REMOVE_INGREDIENT_INFO, payload: {} });
    getIngredientsDataServer()
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: INGREDIENTS_DATA_SUCCESS, payload: { data: res.data }
          });
          const [ingredient] = res.data.filter((obj) => obj._id === id);
          if (ingredient) {
            dispatch({
              type: INGREDIENTS_SET_INGREDIENT_INFO, 
              payload: { 
                ingredientInfo: {
                  ...ingredient,
                  path: path
                }, 
              }
            })
          }
          else {
            dispatch({ type: INGREDIENTS_REMOVE_INGREDIENT_INFO, payload: {} });
            navigate('/404', { replace: true });
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
