import { IngredientInfoType } from './types';

export type IngredientDetailsActionsType =
  | 'INGREDIENT_DETAILS_OPEN_MODAL'
  | 'INGREDIENT_DETAILS_CLOSE_MODAL'
  | 'INGREDIENT_DETAILS_SET_DATA'
  | 'INGREDIENT_DETAILS_REMOVE_DATA';

export type IngredientDetailsStateType = {
  ingredient: IngredientInfoType | null;
  isModalOpened: boolean;
};

export type IngredientDetailsDispatchActionType = {
  type: IngredientDetailsActionsType;
  payload: { ingredient: IngredientInfoType };
};
