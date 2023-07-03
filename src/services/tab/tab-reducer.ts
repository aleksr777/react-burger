import { SET_CURRENT_TAB, CurrentTabActionsType } from './tab-actions';

type StateType = {
  currentTab: string;
};

type DispatchType = {
  type: CurrentTabActionsType;
  payload: { currentTab: 'buns' | 'sauces' | 'fillings' };
};

const defaultState: StateType = {
  currentTab: 'buns',
};

const currentTabReducer = (state: StateType = defaultState, action: DispatchType) => {
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
