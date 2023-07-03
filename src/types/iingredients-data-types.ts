import { IngredientsDataType, IngredientInfoType } from './types';

export type IngredientsDataActionsType =
  | 'INGREDIENTS_GET_DATA_REQUEST'
  | 'INGREDIENTS_GET_DATA_SUCCESS'
  | 'INGREDIENTS_GET_DATA_ERROR'
  | 'INGREDIENTS_GET_DATA_SET_DEFAULT';

export type IngredientsDataStateType = IngredientsDataType & {
  isError: boolean;
  isLoading: boolean;
};

export type ResponseUpdateTokenType = { data: IngredientInfoType[]; success: true } | string;

export type IngredientsDataDispatchType = {
  type: IngredientsDataActionsType;
  payload: IngredientInfoType[];
};
