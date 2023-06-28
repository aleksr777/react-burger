import styles from './constructor-items-list.module.css'
import { useState } from 'react'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useDrop } from 'react-dnd'
import { addBun } from '../../services/selected-ingr/selected-ingr-actions'
import ConstructorItem from '../constructor-item/constructor-item'
import { noIngrObj } from '../../constants/constants'
import ConstructorBunElement from '../constructor-bun-element/constructor-bun-element'
import { getSelectedIngrState, getCounterState } from '../../utils/selectors'
import { IngredientInfoType, CounterType } from '../../types/types'


const ConstructorItemsList = () => {
  const styleItemPositionTop: string = `${ styles.item } ${ styles.item__position_top }`
  const styleItemPositionBottom: string = `${ styles.item } ${ styles.item__position_bottom }`
  const styleListDisabled: string = `${ styles.listScroll } ${ styles.listScroll_disabled }`

  const dispatch = useAppDispatch()

  const { bun, ingredients }: { bun: IngredientInfoType; ingredients: IngredientInfoType[] } = useAppSelector( getSelectedIngrState )
  const dropObj: IngredientInfoType = bun // для лучшей читабельности кода
  const { counter }: { counter: CounterType } = useAppSelector( getCounterState )

  const [ isBun, setIsBun ] = useState<boolean>( false )

  // Добавление булки с добавлением цены в общую стоимость
  const dropHandler = ( dropObj: IngredientInfoType, dragObj: IngredientInfoType ) => {
    if ( dragObj.type === 'bun' ) {
      dispatch( addBun( dropObj, dragObj, counter ) )
    }
  }

  const [ , dropRef ] = useDrop( {
    accept: 'selectedIngr',
    drop ( dragObj: IngredientInfoType ) {
      dropHandler( dropObj, dragObj )
    },
    canDrop ( dragObj: IngredientInfoType ) {
      if ( dragObj.locationDnd === 'IngredientsBurger' && dragObj.type === 'bun' ) {
        setIsBun( true )
        return true
      }
      if ( dragObj.locationDnd === 'IngredientsBurger' && dragObj.type !== 'bun' ) {
        setIsBun( false )
        return false
      }
      setIsBun( false )
      return false
    }
  } )

  const handleDragOver = ( e: React.DragEvent<HTMLUListElement> ) => {
    e.preventDefault()
    isBun ? ( e.currentTarget.style.opacity = '0.6' ) : ( e.currentTarget.style.opacity = '1' )
  }

  const handleDragLeave = ( e: React.DragEvent<HTMLUListElement> ) => {
    e.preventDefault()
    if ( isBun ) {
      e.currentTarget.style.opacity = '1'
    }
  }

  const dropSetOpacity = ( e: React.DragEvent<HTMLUListElement> ) => {
    e.preventDefault()
    if ( isBun ) {
      e.currentTarget.style.opacity = '1'
    }
  }

  return (
    <ul
      className={ styles.list }
      ref={ dropRef }
      onDragOver={ handleDragOver }
      onDragLeave={ handleDragLeave }
      onDrop={ ( e ) => dropSetOpacity( e ) }
    >
      <li className={ styleItemPositionTop }>
        <ConstructorBunElement type='top' positionText='(верх)' />
      </li>

      <li>
        { !ingredients.length ? (
          <ul className={ styleListDisabled }>
            <ConstructorItem obj={ noIngrObj } key={ noIngrObj._uKey } isLocked={ true } />
          </ul>
        ) : (
          <ul className={ styles.listScroll }>
            { ingredients.map( ( obj ) => (
              <ConstructorItem obj={ obj } key={ obj._uKey } isLocked={ false } />
            ) ) }
          </ul>
        ) }
      </li>

      <li className={ styleItemPositionBottom }>
        <ConstructorBunElement type='bottom' positionText='(низ)' />
      </li>
    </ul>
  )
}

export default ConstructorItemsList
