import {
  LOADER_ANIMATION_TIME,
} from '../../constants/constants';
import {
  blockUserInteraction,
  unblockUserInteraction,
} from '../block-user-interaction-service/block-user-interaction-service';
export const PROFILE_ORDERS_REQUEST = 'PROFILE_ORDERS_REQUEST';
export const PROFILE_ORDERS_SUCCESS = 'PROFILE_ORDERS_SUCCESS';
export const PROFILE_ORDERS_SHOW_ERROR = 'PROFILE_ORDERS_SHOW_ERROR';
export const PROFILE_ORDERS_HIDE_ERROR = 'PROFILE_ORDERS_HIDE_ERROR';



export function initWebSocketProfileOrders(ws) {

  return function (dispatch) {

    dispatch({ type: PROFILE_ORDERS_REQUEST, payload: {} });
    blockUserInteraction();

    ws.onmessage = (e) => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        const res = JSON.parse(e.data);
        dispatch({ type: PROFILE_ORDERS_SUCCESS, payload: { orders: res.orders.reverse() } });
        setTimeout(() => { unblockUserInteraction() }, LOADER_ANIMATION_TIME);
      }
    };

    ws.onerror = (err) => {
      console.error('WebSocket error:', err);
      dispatch({ type: PROFILE_ORDERS_SHOW_ERROR, payload: {} });
      setTimeout(() => {
        dispatch({ type: PROFILE_ORDERS_HIDE_ERROR, payload: {} });
        unblockUserInteraction();
      }, 2000);
    };
  };
};