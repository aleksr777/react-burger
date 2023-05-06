import { postOrder } from '../../utils/api';
import { MODAL_ANIMATION_TIME } from '../../constants/constants';
import { handleAuthErrors } from '../authorization/auth-actions';
import { checkAuth } from '../../services/authorization/check-auth';

export const ORDER_ID_OPEN_MODAL = 'ORDER_ID_OPEN_MODAL';
export const ORDER_ID_CLOSE_MODAL = 'ORDER_ID_CLOSE_MODAL';
export const ORDER_ID_REQUEST = 'ORDER_ID_REQUEST';
export const ORDER_ID_SUCCESS = 'ORDER_ID_SUCCESS';
export const ORDER_ID_ERROR = 'ORDER_ID_ERROR';
export const ORDER_ID_REMOVE = 'ORDER_ID_REMOVE';
export const ORDER_ID_SET_DEFAULT = 'ORDER_ID_SET_DEFAULT';

/* Запрос на сервер о формировании заказа 
с открытием модального окна и отображением номера заказа*/
export function getOrderId(arrId) {

  return function (dispatch) {

    async function handleError(response) {
      /* ловим ошибку "401", чтобы обновить токен и снова сделать запрос */
      await dispatch(handleAuthErrors(response, getOrderId(arrId)));
      const isAuth = checkAuth();
      isAuth && dispatch({ type: ORDER_ID_ERROR, payload: { message: response } });
      isAuth && setTimeout(() => {
        dispatch({ type: ORDER_ID_SET_DEFAULT, payload: {} });
      }, 2000);
    }

    dispatch({ type: ORDER_ID_REQUEST, payload: {} });

    postOrder(arrId)
      .then(res => {
        if (res && res.success) {
          dispatch({ type: ORDER_ID_SUCCESS, payload: { id: res.order.number } });
          dispatch({ type: ORDER_ID_OPEN_MODAL, payload: {} });
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
    dispatch({ type: ORDER_ID_CLOSE_MODAL, payload: {} });
    setTimeout(() => {
      dispatch({ type: ORDER_ID_REMOVE, payload: {} });
    }, MODAL_ANIMATION_TIME);
  }
};