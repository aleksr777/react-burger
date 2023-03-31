import { apiConfig } from '../../constants/constants';
import { postOrder } from '../../utils/api';
export const OPEN_MODAL_ORDER_ID = 'OPEN_MODAL_ORDER_ID';
export const CLOSE_MODAL_ORDER_ID = 'CLOSE_MODAL_ORDER_ID';
export const GET_ORDER_ID_REQUEST = 'GET_ORDER_ID_REQUEST';
export const GET_ORDER_ID_SUCCESS = 'GET_ORDER_ID_SUCCESS';
export const GET_ORDER_ID_ERROR = 'GET_ORDER_ID_SUCCESS';
export const REMOVE_ORDER_ID = 'GET_ORDER_ID';


export function getOrderId(arrId) {
  return function (dispatch) {
    dispatch({ type: GET_ORDER_ID_REQUEST, payload: {} });
    postOrder(apiConfig, arrId)
      .then(res => {
        if (res && res.success) {
          dispatch({ type: GET_ORDER_ID_SUCCESS, payload: { id: res.order.number } });
          dispatch({ type: OPEN_MODAL_ORDER_ID, payload: {} });
        }
        else {
          dispatch({ type: GET_ORDER_ID_ERROR, payload: {} });
        };
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: GET_ORDER_ID_ERROR, payload: {} });
      });
  };
};