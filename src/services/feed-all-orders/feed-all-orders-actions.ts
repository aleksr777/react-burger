import { AllOrdersActionsObjType } from '../../types/feed-all-orders-types'

export const feedOrdersActions: AllOrdersActionsObjType = {
  connect: 'FEED_SOCKET_CONNECT',
  disconnect: 'FEED_SOCKET_DISCONNECT',
  request: 'FEED_ORDERS_REQUEST',
  success: 'FEED_ORDERS_SUCCESS',
  showError: 'FEED_ORDERS_SHOW_ERROR',
  hideError: 'FEED_ORDERS_HIDE_ERROR',
}
