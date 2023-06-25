import styles from './feed-statistics.module.css'
import { useSelector } from 'react-redux'
import { getFeedOrdersState } from '../../utils/selectors'
import { OrderInfoType } from '../../types/types'

const FeedStatistics = () => {

  type FeedOrdersType = {
    orders: OrderInfoType[]
    total: number
    totalToday: number
  }

  const { orders, total, totalToday }: FeedOrdersType = useSelector( getFeedOrdersState )

  if ( !orders ) {
    return null
  }

  const styleItemDone: string = `${ styles.status__item } ${ styles.status__item_active }`
  const styleStatusBoxMarginRight: string = `${ styles.status__box } ${ styles.status__box_mr }`
  const styleTextAboutPaddingBottom: string = `${ styles.textAbout } ${ styles.textAbout_pb }`

  const ordersDone: OrderInfoType[] = orders.filter( ( order ) => order.status === 'done' )
  const ordersPending: OrderInfoType[] = orders.filter( ( order ) => order.status === 'pending' )

  return (
    <div className={ styles.block }>
      <div className={ styles.status }>
        <div className={ styleStatusBoxMarginRight }>
          <p className={ styleTextAboutPaddingBottom }>Готовы:</p>
          <ul className={ styles.status__list }>
            { ordersDone.length > 0 &&
              ordersDone.slice( 0, 10 ).map( ( order ) => (
                <li className={ styleItemDone } key={ order._id }>
                  { order.number && order.number.toString().padStart( 6, '0' ) }
                </li>
              ) ) }
          </ul>
          <ul className={ styles.status__list }>
            { ordersDone.length > 10 &&
              ordersDone.slice( 10, 20 ).map( ( order ) => (
                <li className={ styleItemDone } key={ order._id }>
                  { order.number && order.number.toString().padStart( 6, '0' ) }
                </li>
              ) ) }
          </ul>
        </div>

        <div className={ styles.status__box }>
          <p className={ styleTextAboutPaddingBottom }>В работе:</p>
          <ul className={ styles.status__list }>
            { ordersPending.length > 0 &&
              ordersPending.slice( 0, 10 ).map( ( order ) => (
                <li className={ styles.status__item } key={ order._id }>
                  { order.number && order.number.toString().padStart( 6, '0' ) }
                </li>
              ) ) }
          </ul>
          <ul className={ styles.status__list }>
            { ordersPending.length > 10 &&
              ordersPending.slice( 10, 20 ).map( ( order ) => (
                <li className={ styles.status__item } key={ order._id }>
                  { order.number && order.number.toString().padStart( 6, '0' ) }
                </li>
              ) ) }
          </ul>
        </div>
      </div>

      { total && (
        <div className={ styles.countOrders }>
          <p className={ styles.textAbout }>Выполнено за все время:</p>
          <p className={ styles.countOrders__number }>
            { total.toLocaleString( 'ru-RU' ) }
          </p>
        </div>
      ) }

      { totalToday && (
        <div className={ styles.countOrders }>
          <p className={ styles.textAbout }>Выполнено за сегодня:</p>
          <p className={ styles.countOrders__number }>
            { totalToday.toLocaleString( 'ru-RU' ) }
          </p>
        </div>
      ) }
    </div>
  )
}

export default FeedStatistics
