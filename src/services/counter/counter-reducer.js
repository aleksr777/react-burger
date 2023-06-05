import {
  COUNTER_CHANGE,
} from './counter-actions';

const defaultState = {
  counter: {}
}

const counterReducer = (state = defaultState, action) => {

  switch (action.type) {


    case COUNTER_CHANGE: {
      return {
        ...state,
        counter: action.payload,
      };
    };

    default:
      return state;
  };
};

export { counterReducer };