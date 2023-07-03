import { OrderInfoType, LoadingStateType } from './types';

export type AllOrdersActionsType =
  | 'FEED_SOCKET_CONNECT'
  | 'FEED_SOCKET_DISCONNECT'
  | 'FEED_ORDERS_REQUEST'
  | 'FEED_ORDERS_SUCCESS'
  | 'FEED_ORDERS_SHOW_ERROR'
  | 'FEED_ORDERS_HIDE_ERROR';

export type AllOrdersActionsObjType = {
  connect: 'FEED_SOCKET_CONNECT';
  disconnect: 'FEED_SOCKET_DISCONNECT';
  request: 'FEED_ORDERS_REQUEST';
  success: 'FEED_ORDERS_SUCCESS';
  showError: 'FEED_ORDERS_SHOW_ERROR';
  hideError: 'FEED_ORDERS_HIDE_ERROR';
};

export type StateType = LoadingStateType & {
  orders: null | OrderInfoType[];
  total: null | number;
  totalToday: null | number;
};

export type DispatchType = {
  type: AllOrdersActionsType;
  payload: StateType;
};
