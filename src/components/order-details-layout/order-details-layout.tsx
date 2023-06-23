import stylesOrderDetailsLayout from './order-details-layout.module.css'
import { useState, memo } from 'react'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { OrderType } from '../../types/types'

type Props = {
  order: OrderType
}


const OrderDetailsLayout = ( { order }: Props ) => {

  const { number, name, status, ingredients, totalPrice, createdAt, updatedAt }: OrderType = order

  const [ isImgError, setIsImgError ] = useState<boolean>( false )

  function handleImgError () {
    setIsImgError( true )
  }

  const styleStatusDefault: string = stylesOrderDetailsLayout.status
  const styleStatusDone: string = `${ stylesOrderDetailsLayout.status } ${ stylesOrderDetailsLayout.status_active }`

  function getStatusText ( status: string ) {
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

  const dateServer = ( status === 'created' ) ? createdAt : updatedAt

  return (
    <>
      <p className={ stylesOrderDetailsLayout.orderId }>
        { number ? '#' + number.toString().padStart( 6, '0' ) : '' }
      </p>
      <h2 className={ stylesOrderDetailsLayout.title }>{ name }</h2>

      <p className={ status === 'done' ? styleStatusDone : styleStatusDefault }>
        { getStatusText( status ) }
      </p>

      <p className={ stylesOrderDetailsLayout.subtitle }>Состав:</p>

      <ul className={ stylesOrderDetailsLayout.ingredientsList }>
        { ingredients.map( ( ingredient: any ) => (
          <li className={ stylesOrderDetailsLayout.ingredientBlock } key={ ingredient._id }>
            <div className={ stylesOrderDetailsLayout.imageWrapper }>
              <picture className={ stylesOrderDetailsLayout.pictureBox }>
                <img
                  className={ stylesOrderDetailsLayout.image }
                  src={ ingredient.path }
                  alt={ ingredient.name }
                  draggable='false'
                  onError={ handleImgError }
                  style={ {
                    color: isImgError ? '#8585AD' : '',
                  } } // по-умолчанию текст прозрачный
                />
              </picture>
            </div>

            <p className={ stylesOrderDetailsLayout.orderName }>{ ingredient.name }</p>

            <div className={ `${ stylesOrderDetailsLayout.ingredientBlock__priceBlock } ${ stylesOrderDetailsLayout.priceBlock }` }>
              <p className={ stylesOrderDetailsLayout.priceBlock__number }>{ `${ ingredient.count } x ${ ingredient.price }` }</p>
              <CurrencyIcon type='primary' />
            </div>
          </li>
        ) ) }
      </ul>

      <div className={ stylesOrderDetailsLayout.resultBlock }>
        <p className={ stylesOrderDetailsLayout.time }>
          <FormattedDate date={ new Date( dateServer ) } />
        </p>
        <div className={ `${ stylesOrderDetailsLayout.resultBlock__priceBlock } ${ stylesOrderDetailsLayout.priceBlock }` }>
          <p className={ stylesOrderDetailsLayout.priceBlock__number }>{ totalPrice }</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </>
  )
}

export default memo( OrderDetailsLayout )
