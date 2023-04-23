import { apiConfig } from '../../constants/constants';
import { getIngredientsDataServer } from '../../utils/api';

export const GET_DATA_INGREDIENTS_REQUEST = 'GET_DATA_INGREDIENTS';
export const GET_DATA_INGREDIENTS_SUCCESS = 'GET_DATA_INGREDIENTS_SUCCESS';
export const GET_DATA_INGREDIENTS_ERROR = 'GET_DATA_INGREDIENTS_ERROR';
export const SET_DEFAULT_DATA_INGREDIENTS = 'SET_DEFAULT_DATA_INGREDIENTS';

export function getIngredientsData() {

  return function (dispatch) {

    function handleError(response) {
      console.log(response);
      dispatch({ type: GET_DATA_INGREDIENTS_ERROR, payload: { message: response } });
      setTimeout(() => {
        dispatch({ type: SET_DEFAULT_DATA_INGREDIENTS, payload: {} });
      }, 2000);
    }

    dispatch({ type: GET_DATA_INGREDIENTS_REQUEST, payload: {} });

    getIngredientsDataServer(apiConfig)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_DATA_INGREDIENTS_SUCCESS,
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
