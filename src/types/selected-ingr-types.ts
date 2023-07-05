import { IngredientInfoType, SelectedIngredientType } from './types'

export type SelectedIngrActionsType =
  | 'SELECTED_INGREDIENTS_ADD_ITEM'
  | 'SELECTED_INGREDIENTS_SWAP_ITEMS'
  | 'SELECTED_INGREDIENTS_REMOVE_ITEM'
  | 'SELECTED_INGREDIENTS_ADD_BUNS'
  | 'SELECTED_INGREDIENTS_REMOVE_BUNS'
  | 'SELECTED_INGREDIENTS_REMOVE_DATA'

export type SelectedIngrStateType = {
  totalPrice: number
  bun: IngredientInfoType
  ingredients: SelectedIngredientType[]
}

type AddItemDispatchType = {
  type: 'SELECTED_INGREDIENTS_ADD_ITEM'
  payload: {
    arr: SelectedIngredientType[]
    price: number
  }
}

type SwapItemsDispatchType = {
  type: 'SELECTED_INGREDIENTS_SWAP_ITEMS'
  payload: {
    arr: SelectedIngredientType[]
  }
}

type RemoveItemDispatchType = {
  type: 'SELECTED_INGREDIENTS_REMOVE_ITEM'
  payload: {
    arr: SelectedIngredientType[]
    price: number
  }
}

type AddBunsDispatchType = {
  type: 'SELECTED_INGREDIENTS_ADD_BUNS'
  payload: {
    dragObj: IngredientInfoType
    price: number
  }
}

type RemoveBunsDispatchType = {
  type: 'SELECTED_INGREDIENTS_REMOVE_BUNS'
  payload: { price: number }
}

type RemoveDataDispatchType = {
  type: 'SELECTED_INGREDIENTS_REMOVE_DATA'
  payload: any // Если вставлять другие значения, то возникают ошибки компиляции
}

export type SelectedIngrDispatchType =
  | AddItemDispatchType
  | RemoveItemDispatchType
  | SwapItemsDispatchType
  | AddBunsDispatchType
  | RemoveBunsDispatchType
  | RemoveDataDispatchType
