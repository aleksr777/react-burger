import { SET_CURRENT_TAB } from './tab-actions';

type StateType = {
  currentTab: string;
};

const defaultState: StateType = {
  currentTab: 'buns',
};

const currentTabReducer = (state: StateType = defaultState, action: any) => {
  switch (action.type) {
    case SET_CURRENT_TAB:
      return {
        currentTab: action.payload.currentTab,
      };
    default:
      return state;
  }
};

export { currentTabReducer };
