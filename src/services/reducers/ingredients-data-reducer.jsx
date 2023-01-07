import {
  GET_DATA_INGREDIENTS,
} from '../actions/ingredients-data-actions';

const defaultState = {
  data: []
};

const ingredientsDataReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_DATA_INGREDIENTS:
      return {
        data: action.payload.data
      };
    default:
      return state;
  }
};

export { ingredientsDataReducer };