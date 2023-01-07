import { createStore, combineReducers } from 'redux';
import { selectedIngrReducer } from './selected-ingr-reducer';
import { ingredientsDataReducer } from './ingredients-data-reducer';

const rootReducer = combineReducers({
  ingredientsData: ingredientsDataReducer,
  selectedIngr: selectedIngrReducer
});

export const store = createStore(rootReducer);