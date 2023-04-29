import { getIngredientsDataServer } from '../../utils/api';

export const INGREDIENTS_DATA_REQUEST = 'GET_DATA_INGREDIENTS';
export const INGREDIENTS_DATA_SUCCESS = 'INGREDIENTS_DATA_SUCCESS';
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
