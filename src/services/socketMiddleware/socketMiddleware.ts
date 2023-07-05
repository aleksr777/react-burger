import {
  LOADER_ANIMATION_TIME,
} from '../../constants/constants'
import {
  blockUserInteraction,
  unblockUserInteraction,
} from '../block-user-interaction-service/block-user-interaction-service'

import { openWebSocket, closeWebSocket } from '../../utils/api'
import { AllOrdersActionsObjType } from '../../types/feed-all-orders-types'
import { ProfileOrdersActionsObjType } from '../../types/feed-profiles-orders-types'

import { Dispatch } from 'redux'
import { MiddlewareAPI } from 'redux'


export const socketMiddleware = ( url: string, actions: AllOrdersActionsObjType | ProfileOrdersActionsObjType ) => {

  let ws: WebSocket | null = null

  return ( store: MiddlewareAPI ) => ( next: Dispatch ) => ( action: any ) => {

    const { dispatch } = store
    const { request, success, showError, hideError, disconnect } = actions

    switch ( action.type ) {

      case actions.connect:
        if ( !ws || ws.readyState !== WebSocket.OPEN ) {
          dispatch( { type: request, payload: {} } )
          blockUserInteraction()

          ws = openWebSocket( url )

          ws.onmessage = ( e: MessageEvent ) => {
            if ( ws && ws.readyState === WebSocket.OPEN ) {
              const data = JSON.parse( e.data )
              dispatch( { type: success, payload: data } )
              setTimeout( () => { unblockUserInteraction() }, LOADER_ANIMATION_TIME )
            }
          }

          ws.onerror = ( err: Event ) => {
            console.error( 'WebSocket error:', err )
            dispatch( { type: showError, payload: {} } )
            setTimeout( () => {
              dispatch( { type: hideError, payload: {} } )
              unblockUserInteraction()
            }, 2000 )
          }

          ws.onclose = () => {
            ws = null
            dispatch( { type: disconnect } )
          }
        }
        break

      case disconnect:
        if ( ws ) {
          closeWebSocket( ws )
          ws = null
        }
        break

      default:
        return next( action )
    }
  }
}
