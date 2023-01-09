import { createStore, combineReducers } from 'redux';
import { selectedIngrReducer } from './selected-ingr-reducer';
import { ingredientsDataReducer } from './ingredients-data-reducer';
import { orderIdReducer } from './order-id-reducer';
import { ingredientDetailsReducer } from './ingredient-details-reducer';
import { currentTabReducer } from './tab-reducer';

const rootReducer = combineReducers({
  ingredientsData: ingredientsDataReducer,
  selectedIngr: selectedIngrReducer,
  orderId: orderIdReducer,
  ingredientDetails: ingredientDetailsReducer,
  currentTab: currentTabReducer,
});

export const store = createStore(rootReducer);