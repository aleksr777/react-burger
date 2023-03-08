import { apiConfig } from '../../constants/constants';
import { getIngredientsDataServer } from '../../utils/api';

export const GET_DATA_INGREDIENTS_REQUEST = 'GET_DATA_INGREDIENTS';
export const GET_DATA_INGREDIENTS_SUCCESS = 'GET_DATA_INGREDIENTS_SUCCESS';
export const GET_DATA_INGREDIENTS_ERROR = 'GET_DATA_INGREDIENTS_ERROR';

export function getIngredients() {
  return function (dispatch) {
    getIngredientsDataServer(apiConfig)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_DATA_INGREDIENTS_SUCCESS,
            data: res.data
          });
        }
        else {
          dispatch({
            type: GET_DATA_INGREDIENTS_ERROR
          });
        };
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: GET_DATA_INGREDIENTS_ERROR });
      });
  };
};
