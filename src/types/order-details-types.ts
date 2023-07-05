import { OrderInfoType } from './types'

export type OrderDetailsActionsType =
  | 'ORDER_DETAILS_OPEN_MODAL'
  | 'ORDER_DETAILS_CLOSE_MODAL'
  | 'ORDER_DETAILS_SET_DATA'
  | 'ORDER_DETAILS_REMOVE_DATA'

export type OrderStateType = {
  order: OrderInfoType | null
  isModalOpened: boolean
}

export type OrderDetailsDispatchType = {
  type: OrderDetailsActionsType
  payload: { order: OrderInfoType }
}
