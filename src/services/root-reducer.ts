import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { Storage } from 'redux-persist/es/types';
import sessionStorage from 'redux-persist/lib/storage/session';
import { persistReducer } from 'redux-persist';

import { authReducer } from './authorization/auth-reducer';
import { registerUserReducer } from './register-user/register-user-reducer';
import { forgotPasswordReducer } from './forgot-password/forgot-password-reducer';
import { resetPasswordReducer } from './reset-password/reset-password-reducer';
import { ingredientsDataReducer } from './ingredients-data/ingredients-data-reducer';
import { selectedIngrReducer } from './selected-ingr/selected-ingr-reducer';
import { orderIdReducer } from './order-id/order-id-reducer';
import { ingredientDetailsReducer } from './ingredient-details/ingredient-details-reducer';
import { orderDetailsReducer } from './order-details/order-details-reducer';
import { currentTabReducer } from './tab/tab-reducer';
import { profileOrdersReducer } from './profile-orders/profile-orders-reducer';
import { feedOrdersReducer } from './feed-all-orders/feed-all-orders-reducer';
import { counterReducer } from './counter/counter-reducer';
import { STORAGE_KEY_PREFIX } from '../constants/constants';

type PersistConfig = {
  key: string;
  storage: Storage;
  whitelist?: string[];
  blacklist?: string[];
};

const authPersistConfig: PersistConfig = {
  key: `${STORAGE_KEY_PREFIX}auth-persist`,
  storage,
  whitelist: ['isSuccess', 'user'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const forgotPasswordPersistConfig: PersistConfig = {
  key: `${STORAGE_KEY_PREFIX}forgot-password-persist`,
  storage: sessionStorage,
  whitelist: ['isSuccess'],
};

const persistedForgotPasswordReducer = persistReducer(
  forgotPasswordPersistConfig,
  forgotPasswordReducer
);

const ingredientDetailsPersistConfig: PersistConfig = {
  key: `${STORAGE_KEY_PREFIX}ingredient-details-persist`,
  storage: sessionStorage,
  whitelist: ['ingredient', 'isModalOpened'],
};

const persistedIngredientDetailsReducer = persistReducer(
  ingredientDetailsPersistConfig,
  ingredientDetailsReducer
);

const orderDetailsPersistConfig: PersistConfig = {
  key: `${STORAGE_KEY_PREFIX}order-details-persist`,
  storage: sessionStorage,
  whitelist: ['order', 'isModalOpened'],
};

const persistedOrderDetailsReducer = persistReducer(orderDetailsPersistConfig, orderDetailsReducer);

const orderIdPersistConfig: PersistConfig = {
  key: `${STORAGE_KEY_PREFIX}order-id-persist`,
  storage: sessionStorage,
  whitelist: ['id', 'isModalOpened'],
};

const persistedOrderIdReducer = persistReducer(orderIdPersistConfig, orderIdReducer);

const rootReducer = combineReducers({
  authorization: persistedAuthReducer,
  registerUser: registerUserReducer,
  forgotPassword: persistedForgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  ingredientsData: ingredientsDataReducer,
  selectedIngr: selectedIngrReducer,
  orderId: persistedOrderIdReducer,
  ingredientDetails: persistedIngredientDetailsReducer,
  orderDetails: persistedOrderDetailsReducer,
  currentTab: currentTabReducer,
  profileOrders: profileOrdersReducer,
  feedOrders: feedOrdersReducer,
  counter: counterReducer,
});

export default rootReducer;
