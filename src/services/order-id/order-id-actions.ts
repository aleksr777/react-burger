import { postOrder } from '../../utils/api';
import { MODAL_ANIMATION_TIME } from '../../constants/constants';
import { matchNumErr, handleAuthError, requestUpdateToken } from '../authorization/auth-actions';
import { SELECTED_INGREDIENTS_REMOVE_DATA } from '../selected-ingr/selected-ingr-actions';
import { resetCount } from '../counter/counter-actions';
import {
  blockUserInteraction,
  unblockUserInteraction,
} from '../block-user-interaction-service/block-user-interaction-service';
import { DispatchFuncType, CounterType } from '../../types/types';
import { OrderIdActionsType, ResponseOrderIdType } from '../../types/order-id-types';

export const ORDER_ID_OPEN_MODAL: OrderIdActionsType = 'ORDER_ID_OPEN_MODAL';
export const ORDER_ID_CLOSE_MODAL: OrderIdActionsType = 'ORDER_ID_CLOSE_MODAL';
export const ORDER_ID_REQUEST: OrderIdActionsType = 'ORDER_ID_REQUEST';
export const ORDER_ID_SUCCESS: OrderIdActionsType = 'ORDER_ID_SUCCESS';
export const ORDER_ID_ERROR: OrderIdActionsType = 'ORDER_ID_ERROR';
export const ORDER_ID_REMOVE: OrderIdActionsType = 'ORDER_ID_REMOVE';
export const ORDER_ID_SET_DEFAULT: OrderIdActionsType = 'ORDER_ID_SET_DEFAULT';

/* Запрос на сервер о формировании заказа
с открытием модального окна и отображением номера заказа*/
export function getOrderId(arrId: string[], counter: CounterType | {}): DispatchFuncType {
  return function (dispatch) {
    function handleError(response: string) {
      /* ловим ошибку "401", чтобы обновить токен и снова сделать запрос */
      if (matchNumErr(response, 401)) {
        dispatch(handleAuthError(requestUpdateToken(requestUpdateToken)));
      } else {
        dispatch({ type: ORDER_ID_ERROR, payload: {} });
        setTimeout(() => {
          unblockUserInteraction();
          dispatch({ type: ORDER_ID_SET_DEFAULT, payload: {} });
        }, 2000);
      }
    }

    dispatch({ type: ORDER_ID_REQUEST, payload: {} });
    blockUserInteraction();

    postOrder(arrId)
      .then((res: ResponseOrderIdType) => {
        if (typeof res === 'object' && res.success) {
          dispatch({ type: ORDER_ID_SUCCESS, payload: { id: res.order.number } });
          dispatch({ type: ORDER_ID_OPEN_MODAL, payload: {} });
          setTimeout(() => {
            unblockUserInteraction();
            dispatch({ type: SELECTED_INGREDIENTS_REMOVE_DATA, payload: {} });
            dispatch(resetCount(counter));
          }, MODAL_ANIMATION_TIME);
        } else if (typeof res === 'string') {
          handleError(res);
        }
      })
      .catch((err: string) => {
        handleError(err);
      });
  };
}

/* Закрытие модального окна с удалением информации о заказе */
export function closeOrderDetailsModal(): DispatchFuncType {
  return function (dispatch) {
    dispatch({ type: ORDER_ID_CLOSE_MODAL, payload: {} });
    setTimeout(() => {
      dispatch({ type: ORDER_ID_REMOVE, payload: {} });
    }, MODAL_ANIMATION_TIME);
  };
}
