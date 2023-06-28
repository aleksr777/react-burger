import { COUNTER_CHANGE } from './counter-actions';

type StateType = {
  counter: { [key: string]: string | unknown };
};

const defaultState: StateType = {
  counter: {},
};

const counterReducer = (state: StateType = defaultState, action: any) => {
  switch (action.type) {
    case COUNTER_CHANGE: {
      return {
        ...state,
        counter: action.payload,
      };
    }

    default:
      return state;
  }
};

export { counterReducer };
