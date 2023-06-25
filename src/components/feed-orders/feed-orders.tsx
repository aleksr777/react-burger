import styles from './feed-orders.module.css'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { feedOrdersActions } from '../../services/feed-all-orders/feed-all-orders-actions'
import { getFeedOrdersState } from '../../utils/selectors'
import OrderInfoItem from '../order-info-item/order-info-item'
import { OrderInfoType } from '../../types/types'

const FeedOrders = () => {
  const dispatch = useDispatch()

  const { orders }: { orders: OrderInfoType[] } = useSelector( getFeedOrdersState )

  useEffect( () => {
    dispatch( { type: feedOrdersActions.connect } )

    return () => {
      dispatch( { type: feedOrdersActions.disconnect } )
    }
  }, [] )

  if ( !orders ) {
    return null
  }

  return (
    <div className={ styles.block }>
      <h2 className={ styles.title }>Лента заказов</h2>
      <ul className={ styles.list }>
        { orders.map( ( order ) => (
          <OrderInfoItem key={ order._id } order={ order } showStatus={ false } />
        ) ) }
      </ul>
    </div>
  )
}

export default FeedOrders
