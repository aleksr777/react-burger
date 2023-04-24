import { combineReducers } from 'redux';
import { selectedIngrReducer } from './selected-ingr/selected-ingr-reducer';
import { ingredientsDataReducer } from './ingredients-data/ingredients-data-reducer';
import { orderIdReducer } from './order-id/order-id-reducer';
import { loginReducer } from './login/login-reducer';
import { registerUserReducer } from './register-user/register-user-reducer';
import { forgotPasswordReducer } from './forgot-password/forgot-password-reducer';
import { resetPasswordReducer } from './reset-password/reset-password-reducer';
import { ingredientDetailsReducer } from './ingredient-details/ingredient-details-reducer';
import { currentTabReducer } from './tab/tab-reducer';

const rootReducer = combineReducers({
  ingredientsData: ingredientsDataReducer,
  selectedIngr: selectedIngrReducer,
  orderId: orderIdReducer,
  login: loginReducer,
  registerUser: registerUserReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  ingredientDetails: ingredientDetailsReducer,
  currentTab: currentTabReducer,
});

export {rootReducer};