import {
  COUNTER_INCREMENT,
  COUNTER_DECREMENT,
} from './counter-actions';

const defaultState = {
  counter: {}
}

const counterReducer = (state = defaultState, action) => {

  switch (action.type) {


    case COUNTER_INCREMENT: {
      return {
        ...state,
        counter: action.payload,
      };
    };

    case COUNTER_DECREMENT: {
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