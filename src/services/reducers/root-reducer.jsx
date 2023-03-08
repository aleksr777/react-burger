import { combineReducers } from 'redux';
import { selectedIngrReducer } from './selected-ingr-reducer';
import { ingredientsDataReducer } from './ingredients-data-reducer';
import { orderIdReducer } from './order-id-reducer';
import { registerUserReducer } from './register-user-reducer';
import { resetEmailReducer } from './reset-email-reducer';
import { resetPasswordReducer } from './reset-password-reducer';
import { ingredientDetailsReducer } from './ingredient-details-reducer';
import { currentTabReducer } from './tab-reducer';

const rootReducer = combineReducers({
  ingredientsData: ingredientsDataReducer,
  selectedIngr: selectedIngrReducer,
  orderId: orderIdReducer,
  registerUser: registerUserReducer,
  resetEmail: resetEmailReducer,
  resetPassword: resetPasswordReducer,
  ingredientDetails: ingredientDetailsReducer,
  currentTab: currentTabReducer,
});

export {rootReducer};