import { createStore, combineReducers } from 'redux';
import { selectedIngrReducer } from './selected-ingr-reducer';
import { ingredientsDataReducer } from './ingredients-data-reducer';
import { orderIdReducer } from './order-id-reducer';

const rootReducer = combineReducers({
  ingredientsData: ingredientsDataReducer,
  selectedIngr: selectedIngrReducer,
  orderId: orderIdReducer
});

export const store = createStore(rootReducer);