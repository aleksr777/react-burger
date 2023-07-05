import { requestGetIngredientsDataServer } from '../../utils/api'
import { IngredientInfoType, DispatchFuncType } from '../../types/types'
import {
  IngredientsDataActionsType,
  ResponseUpdateTokenType,
} from '../../types/iingredients-data-types'
import {
  blockUserInteraction,
  unblockUserInteraction,
} from '../block-user-interaction-service/block-user-interaction-service'
import { LOADER_ANIMATION_TIME } from '../../constants/constants'
import {
  INGREDIENT_DETAILS_SET_DATA,
  INGREDIENT_DETAILS_REMOVE_DATA,
} from '../ingredient-details/ingredient-details-actions'
import { COUNTER_CHANGE } from '../counter/counter-actions'

export const INGREDIENTS_GET_DATA_REQUEST: IngredientsDataActionsType = 'INGREDIENTS_GET_DATA_REQUEST'
export const INGREDIENTS_GET_DATA_SUCCESS: IngredientsDataActionsType = 'INGREDIENTS_GET_DATA_SUCCESS'
export const INGREDIENTS_GET_DATA_ERROR: IngredientsDataActionsType = 'INGREDIENTS_GET_DATA_ERROR'
export const INGREDIENTS_GET_DATA_SET_DEFAULT: IngredientsDataActionsType =
  'INGREDIENTS_GET_DATA_SET_DEFAULT'

// Получение информации обо всех ингредиентах
export function requestGetIngredientsData (): DispatchFuncType {
  return function ( dispatch ) {
    function handleError ( response: string ) {
      console.log( response )
      dispatch( { type: INGREDIENTS_GET_DATA_ERROR, payload: {} } )
      setTimeout( () => {
        unblockUserInteraction()
        dispatch( { type: INGREDIENTS_GET_DATA_SET_DEFAULT, payload: {} } )
      }, 2000 )
    }

    dispatch( { type: INGREDIENTS_GET_DATA_REQUEST, payload: {} } )
    blockUserInteraction()

    requestGetIngredientsDataServer()
      .then( ( res: ResponseUpdateTokenType ) => {
        if ( typeof res === 'object' && res.success ) {
          let counterObj: {} | IngredientInfoType = {}
          res.data.forEach( function ( obj: IngredientInfoType ) {
            counterObj = { ...counterObj, [ obj._id ]: 0 }
          } )
          dispatch( { type: COUNTER_CHANGE, payload: counterObj } )
          dispatch( { type: INGREDIENTS_GET_DATA_SUCCESS, payload: res.data } )
          setTimeout( () => {
            unblockUserInteraction()
          }, LOADER_ANIMATION_TIME )
        } else if ( typeof res === 'string' ) {
          handleError( res )
        }
      } )
      .catch( ( err: string ) => {
        handleError( err )
      } )
  }
}

// Получение информации об ингредиенте
export function getIngredientInfo (
  goToNotFoundPage: () => void,
  id: string | unknown,
  path: string
): DispatchFuncType {
  return function ( dispatch ) {
    function handleError ( response: string ) {
      console.log( response )
      dispatch( { type: INGREDIENTS_GET_DATA_ERROR, payload: {} } )
      setTimeout( () => {
        unblockUserInteraction()
        dispatch( { type: INGREDIENTS_GET_DATA_SET_DEFAULT, payload: {} } )
        dispatch( { type: INGREDIENT_DETAILS_REMOVE_DATA, payload: {} } )
        goToNotFoundPage()
      }, 2000 )
    }

    // Приходится запрашивать все ингредиенты, так как нет эндпоинта для отдельного компонента.
    dispatch( { type: INGREDIENTS_GET_DATA_REQUEST, payload: {} } )
    dispatch( { type: INGREDIENT_DETAILS_REMOVE_DATA, payload: {} } )
    blockUserInteraction()

    requestGetIngredientsDataServer()
      .then( ( res: ResponseUpdateTokenType ) => {
        if ( typeof res === 'object' && res.success ) {
          let counterObj = {}
          res.data.forEach( function ( obj: IngredientInfoType ) {
            counterObj = { ...counterObj, [ obj._id ]: 0 }
          } )
          dispatch( { type: COUNTER_CHANGE, payload: counterObj } )
          dispatch( { type: INGREDIENTS_GET_DATA_SUCCESS, payload: res.data } )
          setTimeout( () => {
            unblockUserInteraction()
          }, LOADER_ANIMATION_TIME )
          const [ ingredient ] = res.data.filter( ( obj: IngredientInfoType ) => obj._id === id )
          if ( ingredient ) {
            dispatch( {
              type: INGREDIENT_DETAILS_SET_DATA,
              payload: {
                ingredient: {
                  ...ingredient,
                  path: path,
                },
              },
            } )
          } else {
            dispatch( { type: INGREDIENT_DETAILS_REMOVE_DATA, payload: {} } )
            goToNotFoundPage()
          }
        } else if ( typeof res === 'string' ) {
          handleError( res )
        }
      } )
      .catch( ( err: string ) => {
        handleError( err )
      } )
  }
}
