import { ProfileOrdersActionsObjType } from '../../types/feed-profiles-orders-types';

export const profileOrdersActions: ProfileOrdersActionsObjType = {
  connect: 'PROFILE_ORDERS_SOCKET_CONNECT',
  disconnect: 'PROFILE_ORDERS_SOCKET_DISCONNECT',
  request: 'PROFILE_ORDERS_ORDERS_REQUEST',
  success: 'PROFILE_ORDERS_ORDERS_SUCCESS',
  showError: 'PROFILE_ORDERS_ORDERS_SHOW_ERROR',
  hideError: 'PROFILE_ORDERS_ORDERS_HIDE_ERROR',
};
