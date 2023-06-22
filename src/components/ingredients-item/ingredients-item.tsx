import stylesIngredientsItem from './ingredients-item.module.css'
import { useState, memo } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AnyAction } from 'redux'
import { useDrag } from "react-dnd"
import { openIngredientDetailsModal } from '../../services/ingredient-details/ingredient-details-actions'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import CounterItem from '../counter-item/counter-item'
import { IngredientObjType } from '../../types/types'

type Props = {
  ingredient: IngredientObjType
  count: number
}


const IngredientsItem = ( { ingredient, count }: Props ) => {
  const location = useLocation()
  const dispatch = useDispatch()

  const [ isImgError, setIsImgError ] = useState( false )
  function handleImgError () {
    setIsImgError( true )
  }

  const handleOpenModal = ( ingredient: IngredientObjType ) => {
    dispatch( openIngredientDetailsModal( ingredient ) as unknown as AnyAction )
  }

  const [ { dragItemOpacity, dragItemTransition }, dragRef ] = useDrag( {
    type: 'selectedIngr',
    item: ingredient,
    collect: ( monitor ) => ( {
      dragItemOpacity: monitor.isDragging() ? 0 : 1,
      dragItemTransition: monitor.isDragging() ? 'none' : '',
    } ),
  } )

  return (
    <li
      ref={ dragRef }
      className={ stylesIngredientsItem.item }
      style={ {
        transition: dragItemTransition,
        opacity: dragItemOpacity,
      } }
    >
      <Link
        className={ stylesIngredientsItem.link }
        to={ `/ingredients/${ ingredient._id }` }
        state={ { from: location.pathname } }
        draggable='false'
        onClick={ () => {
          handleOpenModal( ingredient )
        } }
      >
        <CounterItem count={ count } />

        <picture className={ stylesIngredientsItem.item__pictureBox }>
          <img
            className={ stylesIngredientsItem.item__image }
            src={ ingredient.image_large }
            alt={ `Изображение "${ ingredient.name }"` }
            onError={ handleImgError }
            style={ {
              color: isImgError ? '#8585AD' : '',
              outline: isImgError ? '#8585AD solid 1px' : '',
            } }
          />
        </picture>

        <div className={ stylesIngredientsItem.item__box }>
          <p className={ stylesIngredientsItem.item__price }>{ ingredient.price }</p>
          <CurrencyIcon type='primary' />
        </div>

        <p className={ stylesIngredientsItem.item__title }>{ ingredient.name }</p>
      </Link>
    </li>
  )
}

export default memo( IngredientsItem )
