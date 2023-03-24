import { combineReducers } from 'redux';
import { selectedIngrReducer } from './selected-ingr/selected-ingr-reducer';
import { ingredientsDataReducer } from './ingredients-data/ingredients-data-reducer';
import { orderIdReducer } from './order-id/order-id-reducer';
import { registerUserReducer } from './register-user/register-user-reducer';
import { resetEmailReducer } from './reset-email/reset-email-reducer';
import { resetPasswordReducer } from './reset-password/reset-password-reducer';
import { ingredientDetailsReducer } from './ingredient-details/ingredient-details-reducer';
import { currentTabReducer } from './tab/tab-reducer';
import { modalReducer } from './modal/modal-reducer';

const rootReducer = combineReducers({
  ingredientsData: ingredientsDataReducer,
  selectedIngr: selectedIngrReducer,
  orderId: orderIdReducer,
  registerUser: registerUserReducer,
  resetEmail: resetEmailReducer,
  resetPassword: resetPasswordReducer,
  ingredientDetails: ingredientDetailsReducer,
  currentTab: currentTabReducer,
  modal: modalReducer,
});

export {rootReducer};