import { RootState } from '../hooks/useAppSelector';

export const getIngredientsDataState = (state: RootState) => state.ingredientsData;
export const getSelectedIngrState = (state: RootState) => state.selectedIngr;
export const getIngredientDetailsState = (state: RootState) => state.ingredientDetails;
export const getOrderDetailsState = (state: RootState) => state.orderDetails;
export const getAuthState = (state: RootState) => state.authorization;
export const getOrderIdState = (state: RootState) => state.orderId;
export const getForgotPasswordState = (state: RootState) => state.forgotPassword;
export const getRegisterUserState = (state: RootState) => state.registerUser;
export const getResetPasswordState = (state: RootState) => state.resetPassword;
export const getCurrentTabState = (state: RootState) => state.currentTab;
export const getProfileOrdersState = (state: RootState) => state.profileOrders;
export const getFeedOrdersState = (state: RootState) => state.feedOrders;
export const getCounterState = (state: RootState) => state.counter;
