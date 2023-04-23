import { apiConfig } from '../../constants/constants';
import { postOrder } from '../../utils/api';
import { MODAL_ANIMATION_TIME } from '../../constants/constants';
export const OPEN_MODAL_ORDER_ID = 'OPEN_MODAL_ORDER_ID';
export const CLOSE_MODAL_ORDER_ID = 'CLOSE_MODAL_ORDER_ID';
export const GET_ORDER_ID_REQUEST = 'GET_ORDER_ID_REQUEST';
export const GET_ORDER_ID_SUCCESS = 'GET_ORDER_ID_SUCCESS';
export const GET_ORDER_ID_ERROR = 'GET_ORDER_ID_ERROR';
export const REMOVE_ORDER_ID = 'REMOVE_ORDER_ID';
export const SET_DEFAULT_ORDER_ID = 'SET_DEFAULT_ORDER_ID';

/* Запрос на сервер о формировании заказа 
с открытием модального окна и отображением номера заказа*/
export function getOrderId(arrId) {

  return function (dispatch) {

    function handleError(response) {
      console.log(response);
      dispatch({ type: GET_ORDER_ID_ERROR, payload: { message: response } });
      setTimeout(() => {
        dispatch({ type: SET_DEFAULT_ORDER_ID, payload: {} });
      }, 2000);
    }

    dispatch({ type: GET_ORDER_ID_REQUEST, payload: {} });

    postOrder(apiConfig, arrId)
      .then(res => {
        if (res && res.success) {
          dispatch({ type: GET_ORDER_ID_SUCCESS, payload: { id: res.order.number } });
          dispatch({ type: OPEN_MODAL_ORDER_ID, payload: {} });
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

/* Закрытие модального окна с удалением информации о заказе */
export function closeOrderDetailsModal() {
  return function (dispatch) {
    dispatch({ type: CLOSE_MODAL_ORDER_ID, payload: {} });
    setTimeout(() => {
      dispatch({ type: REMOVE_ORDER_ID, payload: {} });
    }, MODAL_ANIMATION_TIME);
  }
};