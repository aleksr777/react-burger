import { COUNTER_CHANGE } from './counter-actions'
import { CounterStateType, CounterDispatchType } from '../../types/counter-types'

const defaultState: CounterStateType = {
  counter: {},
}

const counterReducer = ( state: CounterStateType = defaultState, action: CounterDispatchType ) => {
  switch ( action.type ) {
    case COUNTER_CHANGE: {
      return {
        ...state,
        counter: action.payload,
      }
    }

    default:
      return state
  }
}

export { counterReducer }
