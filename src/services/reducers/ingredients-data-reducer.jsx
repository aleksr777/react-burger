import {
  UPDATE_DATA,
} from '../actions/ingredients-data-actions';

const defaultState = {
  data: []
};

const ingredientsDataReducer = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_DATA:
      return {
        data: action.payload.data
      };
    default:
      return state;
  }
};

export { ingredientsDataReducer };