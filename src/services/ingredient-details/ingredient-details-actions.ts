import { MODAL_ANIMATION_TIME } from '../../constants/constants'
import { IngredientDetailsActionsType } from '../../types/ingredient-details-types'
import { IngredientInfoType, DispatchFuncType } from '../../types/types'

export const INGREDIENT_DETAILS_OPEN_MODAL: IngredientDetailsActionsType =
  'INGREDIENT_DETAILS_OPEN_MODAL'
export const INGREDIENT_DETAILS_CLOSE_MODAL: IngredientDetailsActionsType =
  'INGREDIENT_DETAILS_CLOSE_MODAL'
export const INGREDIENT_DETAILS_SET_DATA: IngredientDetailsActionsType =
  'INGREDIENT_DETAILS_SET_DATA'
export const INGREDIENT_DETAILS_REMOVE_DATA: IngredientDetailsActionsType =
  'INGREDIENT_DETAILS_REMOVE_DATA'

export function openIngredientDetailsModal ( ingredient: IngredientInfoType ): DispatchFuncType {
  return function ( dispatch ) {
    dispatch( { type: INGREDIENT_DETAILS_SET_DATA, payload: { ingredient: ingredient } } )
    dispatch( { type: INGREDIENT_DETAILS_OPEN_MODAL, payload: {} } )
  }
}

export function closeIngredientDetailsModal ( goToPage: () => void ): DispatchFuncType {
  return function ( dispatch ) {
    dispatch( { type: INGREDIENT_DETAILS_CLOSE_MODAL, payload: {} } )
    setTimeout( () => {
      dispatch( { type: INGREDIENT_DETAILS_REMOVE_DATA, payload: {} } )
      goToPage()
    }, MODAL_ANIMATION_TIME )
  }
}
