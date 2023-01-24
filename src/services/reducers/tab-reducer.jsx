import {
  SET_CURRENT_TAB,
} from '../actions/tab-actions';

const currentTabState = {
  currentTab: 'buns'
};

const currentTabReducer = (state = currentTabState, action) => {
  switch (action.type) {
    case SET_CURRENT_TAB:
      return {
        currentTab: action.payload.currentTab
      };
    default:
      return state;
  }
};

export { currentTabReducer };