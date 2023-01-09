import {
  SET_CURRENT_TAB,
} from '../actions/tab-actions';

const defaultState = {
  current: 'buns'
};

const currentTabReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_CURRENT_TAB:
      return {
        current: action.payload.current
      };
    default:
      return state;
  }
};

export { currentTabReducer };