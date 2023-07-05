import { OrderInfoType, LoadingStateType } from './types'

export type ProfileOrdersActionsType =
  | 'PROFILE_ORDERS_SOCKET_CONNECT'
  | 'PROFILE_ORDERS_SOCKET_DISCONNECT'
  | 'PROFILE_ORDERS_ORDERS_REQUEST'
  | 'PROFILE_ORDERS_ORDERS_SUCCESS'
  | 'PROFILE_ORDERS_ORDERS_SHOW_ERROR'
  | 'PROFILE_ORDERS_ORDERS_HIDE_ERROR'

export type ProfileOrdersActionsObjType = {
  connect: 'PROFILE_ORDERS_SOCKET_CONNECT'
  disconnect: 'PROFILE_ORDERS_SOCKET_DISCONNECT'
  request: 'PROFILE_ORDERS_ORDERS_REQUEST'
  success: 'PROFILE_ORDERS_ORDERS_SUCCESS'
  showError: 'PROFILE_ORDERS_ORDERS_SHOW_ERROR'
  hideError: 'PROFILE_ORDERS_ORDERS_HIDE_ERROR'
}

export type StateType = LoadingStateType & {
  orders: null | OrderInfoType[]
}

export type DispatchType = {
  type: ProfileOrdersActionsType
  payload: StateType
}
