import {
  START_LOADING,
  STOP_LOADING
} from '../actions/loading-state-actions';

const defaultState = {
  isLoading: false
};

const loadingStateReducer = (state = defaultState, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        isLoading: true
      };
    case STOP_LOADING:
      return {
        isLoading: false
      };
    default:
      return state;
  }
};

export { loadingStateReducer };