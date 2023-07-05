import { feedOrdersActions } from './feed-all-orders-actions'
import { StateType, DispatchType } from '../../types/feed-all-orders-types'

const defaultState: StateType = {
  isSuccess: false,
  isLoading: false,
  isError: false,
  orders: null,
  total: null,
  totalToday: null,
}

const feedOrdersReducer = ( state: StateType = defaultState, action: DispatchType ) => {
  switch ( action.type ) {
    case feedOrdersActions.request: {
      return {
        ...state,
        isLoading: true,
      }
    }

    case feedOrdersActions.success:
      return {
        ...state,
        isSuccess: true,
        isLoading: false,
        isError: false,
        orders: action.payload.orders ? action.payload.orders : null,
        total: action.payload.total ? action.payload.total : null,
        totalToday: action.payload.totalToday ? action.payload.totalToday : null,
      }

    case feedOrdersActions.showError:
      return {
        ...state,
        isError: true,
      }

    case feedOrdersActions.hideError:
      return {
        ...state,
        isLoading: false,
        isError: false,
      }

    default:
      return state
  }
}

export { feedOrdersReducer }
