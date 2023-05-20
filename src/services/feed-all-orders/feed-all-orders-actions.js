import {
  LOADER_ANIMATION_TIME,
} from '../../constants/constants';
import {
  blockUserInteraction,
  unblockUserInteraction,
} from '../block-user-interaction-service/block-user-interaction-service';
export const FEED_ORDERS_REQUEST = 'FEED_ORDERS_REQUEST';
export const FEED_ORDERS_SUCCESS = 'FEED_ORDERS_SUCCESS';
export const FEED_ORDERS_SHOW_ERROR = 'FEED_ORDERS_SHOW_ERROR';
export const FEED_ORDERS_HIDE_ERROR = 'FEED_ORDERS_HIDE_ERROR';



export function initWebSocketFeedOrders(ws) {

  return function (dispatch) {

    dispatch({ type: FEED_ORDERS_REQUEST, payload: {} });
    blockUserInteraction();

    ws.onmessage = (e) => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        const res = JSON.parse(e.data);
        dispatch({
          type: FEED_ORDERS_SUCCESS, payload: {
            orders: res.orders.reverse(),
            total: res.total,
            totalToday: res.totalToday,
          }
        });
        setTimeout(() => { unblockUserInteraction() }, LOADER_ANIMATION_TIME);
      }
    };

    ws.onerror = (err) => {
      console.error('WebSocket error:', err);
      dispatch({ type: FEED_ORDERS_SHOW_ERROR, payload: {} });
      setTimeout(() => {
        dispatch({ type: FEED_ORDERS_HIDE_ERROR, payload: {} });
        unblockUserInteraction();
      }, 2000);
    };
  };
};