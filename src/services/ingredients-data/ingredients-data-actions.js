import { getIngredientsDataServer } from '../../utils/api';
import { requestUpdateToken } from '../authorization/auth-actions';

export const INGREDIENTS_DATA_REQUEST = 'INGREDIENTS_DATA_REQUEST';
export const INGREDIENTS_DATA_SUCCESS = 'INGREDIENTS_DATA_SUCCESS';
export const INGREDIENTS_DATA_ERROR = 'INGREDIENTS_DATA_ERROR';
export const INGREDIENTS_DATA_SET_DEFAULT = 'INGREDIENTS_DATA_SET_DEFAULT';

export function getIngredientsData() {

  return function (dispatch) {

    function handleError(response) {
      console.log(response);
      /* ловим ошибку "401", чтобы обновить токен и снова сделать запрос */
      if (response.indexOf('401') !== -1) {
        return dispatch(requestUpdateToken(getIngredientsData()));
      }
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
            type: INGREDIENTS_DATA_SUCCESS,
            data: res.data
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
