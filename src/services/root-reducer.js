import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import sessionStorage from 'redux-persist/lib/storage/session';
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
  key: 'react-burger-auth',
  storage,
  whitelist: ['success', 'user'],
};
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const forgotPasswordPersistConfig = {
  key: 'react-burger-forgotPassword',
  storage: sessionStorage,
  whitelist: ['success'],
};
const persistedForgotPasswordReducer = persistReducer(forgotPasswordPersistConfig, forgotPasswordReducer);

const selectedIngrPersistConfig = {
  key: 'react-burger-selectedIngr',
  storage: sessionStorage,
  whitelist: ['totalPrice', 'bun', 'ingredients'],
};
const persistedSelectedIngrReducer = persistReducer(selectedIngrPersistConfig, selectedIngrReducer);

const orderIdPersistConfig = {
  key: 'react-burger-orderId',
  storage: sessionStorage,
  whitelist: ['id'],
};
const persistedOrderIdReducer = persistReducer(orderIdPersistConfig, orderIdReducer);

const ingredientDetailsConfig = {
  key: 'react-burger-ingredientDetails',
  storage: sessionStorage,
  whitelist: ['ingredient'],
};
const persistedIngredientDetailsReducer = persistReducer(ingredientDetailsConfig, ingredientDetailsReducer);


const rootReducer = combineReducers({
  authorization: persistedAuthReducer,
  registerUser: registerUserReducer,
  forgotPassword: persistedForgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  ingredientsData: ingredientsDataReducer,
  selectedIngr: persistedSelectedIngrReducer,
  orderId: persistedOrderIdReducer,
  ingredientDetails: persistedIngredientDetailsReducer,
  currentTab: currentTabReducer,
});

export default rootReducer;