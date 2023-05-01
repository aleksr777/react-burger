import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist'

import { authReducer } from './authorization/auth-reducer';
import { registerUserReducer } from './register-user/register-user-reducer';
import { forgotPasswordReducer } from './forgot-password/forgot-password-reducer';
import { resetPasswordReducer } from './reset-password/reset-password-reducer';
import { ingredientsDataReducer } from './ingredients-data/ingredients-data-reducer';
import { selectedIngrReducer } from './selected-ingr/selected-ingr-reducer';
import { orderIdReducer } from './order-id/order-id-reducer';
import { ingredientDetailsReducer } from './ingredient-details/ingredient-details-reducer';
import { currentTabReducer } from './tab/tab-reducer';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['success', 'user'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const rootReducer = combineReducers({
  authorization: persistedAuthReducer,
  registerUser: registerUserReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  ingredientsData: ingredientsDataReducer,
  selectedIngr: selectedIngrReducer,
  orderId: orderIdReducer,
  ingredientDetails: ingredientDetailsReducer,
  currentTab: currentTabReducer,
});

export default rootReducer;