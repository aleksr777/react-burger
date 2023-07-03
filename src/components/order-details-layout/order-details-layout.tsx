import styles from './order-details-layout.module.css'
import { useState, memo } from 'react'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { OrderInfoType, SelectedIngredientType } from '../../types/types'

type Props = {
  order: OrderInfoType
}


const OrderDetailsLayout = ( { order }: Props ) => {

  const { number, name, status, ingredients, totalPrice, createdAt, updatedAt } = order

  const [ isImgError, setIsImgError ] = useState( false )

  function handleImgError () {
    setIsImgError( true )
  }

  const styleStatusDefault: string = styles.status
  const styleStatusDone: string = `${ styles.status } ${ styles.status_active }`

  function getStatusText ( status: string ): string {
    switch ( status ) {
      case 'created':
        return 'Создан'
      case 'pending':
        return 'Готовится'
      case 'done':
        return 'Выполнен'
      default:
        return ''
    }
  }

  const dateServer: string = ( status === 'created' ) ? createdAt : updatedAt

  return (
    <>
      <p className={ styles.orderId }>
        { number ? '#' + number.toString().padStart( 6, '0' ) : '' }
      </p>
      <h2 className={ styles.title }>{ name }</h2>

      <p className={ status === 'done' ? styleStatusDone : styleStatusDefault }>
        { getStatusText( status ) }
      </p>

      <p className={ styles.subtitle }>Состав:</p>

      <ul className={ styles.ingredientsList }>
        { ingredients.map( ( { _id, path, name, count, price }: any ) => (
          // Если заменить 'any' на SelectedIngredientType, возникают ошибки компиляции. Явное указание типов тоже не работает.
          <li className={ styles.ingredientBlock } key={ _id }>
            <div className={ styles.imageWrapper }>
              <picture className={ styles.pictureBox }>
                <img
                  className={ styles.image }
                  src={ path }
                  alt={ name }
                  draggable='false'
                  onError={ handleImgError }
                  style={ {
                    color: isImgError ? '#8585AD' : '',
                  } } // по-умолчанию текст прозрачный
                />
              </picture>
            </div>

            <p className={ styles.orderName }>{ name }</p>

            <div className={ `${ styles.ingredientBlock__priceBlock } ${ styles.priceBlock }` }>
              <p className={ styles.priceBlock__number }>{ `${ count } x ${ price }` }</p>
              <CurrencyIcon type='primary' />
            </div>
          </li>
        ) ) }
      </ul>

      <div className={ styles.resultBlock }>
        <p className={ styles.time }>
          <FormattedDate date={ new Date( dateServer ) } />
        </p>
        <div className={ `${ styles.resultBlock__priceBlock } ${ styles.priceBlock }` }>
          <p className={ styles.priceBlock__number }>{ totalPrice }</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </>
  )
}

export default memo( OrderDetailsLayout )
