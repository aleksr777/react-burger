import { MODAL_ANIMATION_TIME } from '../../constants/constants'
import { OrderDataType, DispatchFuncType } from '../../types/types'
import { OrderDetailsActionsType } from '../../types/order-details-types'

export const ORDER_DETAILS_OPEN_MODAL: OrderDetailsActionsType = 'ORDER_DETAILS_OPEN_MODAL'
export const ORDER_DETAILS_CLOSE_MODAL: OrderDetailsActionsType = 'ORDER_DETAILS_CLOSE_MODAL'
export const ORDER_DETAILS_SET_DATA: OrderDetailsActionsType = 'ORDER_DETAILS_SET_DATA'
export const ORDER_DETAILS_REMOVE_DATA: OrderDetailsActionsType = 'ORDER_DETAILS_REMOVE_DATA'

export function openOrderDetailsModal ( orderData: OrderDataType ): DispatchFuncType {
  return function ( dispatch ) {
    dispatch( {
      type: ORDER_DETAILS_SET_DATA,
      payload: {
        order: orderData,
      },
    } )
    dispatch( { type: ORDER_DETAILS_OPEN_MODAL, payload: {} } )
  }
}

export function closeOrderDetailsModal ( goToPage: () => void ): DispatchFuncType {
  return function ( dispatch ) {
    dispatch( { type: ORDER_DETAILS_CLOSE_MODAL, payload: {} } )
    setTimeout( () => {
      dispatch( { type: ORDER_DETAILS_REMOVE_DATA, payload: {} } )
      goToPage()
    }, MODAL_ANIMATION_TIME )
  }
}
