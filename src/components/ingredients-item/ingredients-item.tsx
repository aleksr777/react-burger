import styles from './ingredients-item.module.css'
import { useState, memo } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useDrag } from "react-dnd"
import { openIngredientDetailsModal } from '../../services/ingredient-details/ingredient-details-actions'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import CounterItem from '../counter-item/counter-item'
import { IngredientInfoType } from '../../types/types'

type Props = {
  ingredient: IngredientInfoType
  count: number
}


const IngredientsItem = ( { ingredient, count }: Props ) => {
  const location = useLocation()
  const dispatch = useDispatch()

  const [ isImgError, setIsImgError ] = useState( false )
  function handleImgError () {
    setIsImgError( true )
  }

  const handleOpenModal = ( ingredient: IngredientInfoType ) => {
    dispatch( openIngredientDetailsModal( ingredient ) as any )
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
      className={ styles.item }
      style={ {
        transition: dragItemTransition,
        opacity: dragItemOpacity,
      } }
    >
      <Link
        className={ styles.link }
        to={ `/ingredients/${ ingredient._id }` }
        state={ { from: location.pathname } }
        draggable='false'
        onClick={ () => {
          handleOpenModal( ingredient )
        } }
      >
        <CounterItem count={ count } />

        <picture className={ styles.item__pictureBox }>
          <img
            className={ styles.item__image }
            src={ ingredient.image_large }
            alt={ `Изображение "${ ingredient.name }"` }
            onError={ handleImgError }
            style={ {
              color: isImgError ? '#8585AD' : '',
              outline: isImgError ? '#8585AD solid 1px' : '',
            } }
          />
        </picture>

        <div className={ styles.item__box }>
          <p className={ styles.item__price }>{ ingredient.price }</p>
          <CurrencyIcon type='primary' />
        </div>

        <p className={ styles.item__title }>{ ingredient.name }</p>
      </Link>
    </li>
  )
}

export default memo( IngredientsItem )
