import {
  SET_CURRENT_TAB,
} from '../actions/tab-actions';

const defaultState = {
  currentTab: 'buns'
};

const currentTabReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_CURRENT_TAB:
      return {
        currentTab: action.payload.currentTab
      };
    default:
      return defaultState;
  }
};

export { currentTabReducer };