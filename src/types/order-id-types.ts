import { UserType, IngredientInfoType, OrderDataType } from './types';

export type OrderIdActionsType =
  | 'ORDER_ID_OPEN_MODAL'
  | 'ORDER_ID_CLOSE_MODAL'
  | 'ORDER_ID_REQUEST'
  | 'ORDER_ID_SUCCESS'
  | 'ORDER_ID_ERROR'
  | 'ORDER_ID_REMOVE'
  | 'ORDER_ID_SET_DEFAULT';

export type OrderIdStateType = {
  id: null | number;
  isLoading: boolean;
  isModalOpened: boolean;
  isError: boolean;
};

export type ResponseOrderIdType =
  | {
      name: string;
      order: OrderDataType;
      success: true;
    }
  | string;

export type OrderIdDispatchType = {
  type: OrderIdActionsType;
  payload: { id: number };
};
