import {
  OPEN_MODAL,
  REMOVE_MODAL
} from './modal-actions';

const defaultState = {
  isOpened: false
};

const modalReducer = (state = defaultState, action) => {

  switch (action.type) {

    case OPEN_MODAL:
      return {
        ...state,
        isOpened: true
      };

    case REMOVE_MODAL:
      return {
        ...state,
        isOpened: false
      };

    default:
      return state;
  }
};

export { modalReducer };