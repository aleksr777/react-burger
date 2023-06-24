import styles from './constructor-item.module.css'
import { memo, useRef, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useDrag, useDrop } from 'react-dnd'
import {
  removeIngredient,
  swapIngredients,
  addIngredient
} from '../../services/selected-ingr/selected-ingr-actions'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { getSelectedIngrState, getCounterState } from '../../utils/selectors'
import { IngredientInfoType, CounterType } from '../../types/types'

interface Props {
  obj: IngredientInfoType
  isLocked: boolean
}

const ConstructorItem = ( { obj, isLocked }: Props ) => {
  const dispatch = useDispatch()

  const [ itemOpacity, setItemOpacity ] = useState<number>( 0 )

  const { ingredients }: { ingredients: IngredientInfoType[] } = useSelector( getSelectedIngrState )
  const { counter }: { counter: CounterType } = useSelector( getCounterState )

  const [ { dragItemData, isItemDragging }, dragRef ] = useDrag( {
    type: 'selectedIngr',
    item: obj,
    canDrag: () => {
      if ( isLocked || obj.type === 'bun' ) {
        return false
      }
      return true
    },
    collect: ( monitor ) => ( {
      dragItemData: monitor.getItem(),
      isItemDragging: monitor.isDragging()
    } )
  } )

  const [ , dropRef ] = useDrop( {
    accept: 'selectedIngr',
    drop ( dragObj: IngredientInfoType ) {
      dropHandler( obj, dragObj )
    }
  } )

  function dropHandler ( dropObj: IngredientInfoType, dragObj: IngredientInfoType ) {
    if ( dragObj.type !== 'bun' ) {
      if ( dragItemData.locationDnd === 'ConstructorBurger' ) {
        if ( dropObj._uKey !== dragObj._uKey ) {
          // исключаем перетаскивание на самого себя
          dispatch( swapIngredients( dropObj, dragObj, ingredients ) as any )
        }
      } else if ( dragItemData.locationDnd === 'IngredientsBurger' ) {
        dispatch( addIngredient( dropObj, dragObj, ingredients, counter ) as any )
      }
    }
  }

  function dragOverSetOpacity ( e: React.DragEvent<HTMLLIElement> ) {
    e.preventDefault()
    if ( !isItemDragging && dragItemData.type !== 'bun' ) {
      e.currentTarget.style.opacity = '.6'
    }
  }

  function dragLeaveSetOpacity ( e: React.DragEvent<HTMLLIElement> ) {
    e.preventDefault()
    if ( !isItemDragging ) {
      e.currentTarget.style.opacity = '1'
    }
  }

  function dropSetOpacity ( e: React.DragEvent<HTMLLIElement> ) {
    e.preventDefault()
    if ( !isItemDragging ) {
      e.currentTarget.style.opacity = '1'
    }
  }

  useEffect( () => {
    // Задаём прозрачность перетаскиваемого объекта
    if ( isItemDragging ) {
      setItemOpacity( 0 )
    } else if ( !isItemDragging ) {
      setItemOpacity( 1 )
    } else if ( !isItemDragging ) {
      setItemOpacity( 1 )
    }
  }, [ isItemDragging ] )

  const dragDropRef = useRef<HTMLLIElement>( null )
  dragRef( dragDropRef )
  dropRef( dragDropRef )

  return (
    <li
      className={ styles.item }
      ref={ dragDropRef }
      onDragOver={ ( e ) => dragOverSetOpacity( e ) }
      onDragLeave={ ( e ) => dragLeaveSetOpacity( e ) }
      onDrop={ ( e ) => dropSetOpacity( e ) }
      style={ {
        cursor: isLocked || obj.type === 'bun' ? 'default' : '',
        opacity: `${ itemOpacity }`
      } }
    >
      <div style={ { opacity: !isLocked ? 1 : 0 } }>
        <DragIcon type='primary' />
      </div>

      <ConstructorElement
        isLocked={ isLocked }
        text={ obj.name }
        price={ obj.price }
        thumbnail={ obj.image }
        handleClose={ () => {
          setItemOpacity( 0 )
          dispatch( removeIngredient( obj, ingredients, counter ) as any )
        } }
      />
    </li>
  )
}

export default memo( ConstructorItem )
