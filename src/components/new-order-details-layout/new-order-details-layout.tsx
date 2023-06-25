import React from 'react'
import styles from './new-order-details-layout.module.css'
import donePath from '../../images/done.svg'

type Props = {
  orderId: string
}

const NewOrderDetailsLayout = ( { orderId }: Props ) => {

  return (
    <div className={ styles.container }>
      <p className={ styles.id }>{ orderId }</p>
      <p className={ styles.title }>идентификатор заказа</p>

      <picture className={ styles.imageBox }>
        <img
          className={ styles.image }
          src={ donePath }
          alt='Иконка успешного заказа.'
          draggable='false'
        />
      </picture>

      <p className={ styles.info }>Ваш заказ начали готовить</p>
      <p className={ styles.instruction }>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

export default NewOrderDetailsLayout
