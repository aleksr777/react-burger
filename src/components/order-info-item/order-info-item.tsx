import styles from './order-info-item.module.css'
import { useLocation, Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { openOrderDetailsModal } from '../../services/order-details/order-details-actions'
import {
  getTotalPrice,
  getArrIngredients,
  removeDuplicateIngredients
} from '../../services/order-details/order-details-service'
import OrderInfoIngredients from '../order-info-ingredients/order-info-ingredients'
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { getIngredientsDataState } from '../../utils/selectors'
import { OrderInfoType, OrderDataType, SelectedIngredientType } from '../../types/types'

type Props = {
  order: OrderInfoType,
  showStatus: boolean
}


const OrderInfoItem = ( { order, showStatus }: Props ) => {

  const location = useLocation()
  const dispatch = useAppDispatch()

  const styleStatusDefault: string = styles.order__status
  const styleStatusDone: string = `${ styles.order__status } ${ styles.order__status_active }`

  const { ingredientsData } = useAppSelector( getIngredientsDataState )

  let arrIngredients: SelectedIngredientType[] = getArrIngredients( ingredientsData, order )

  const totalPrice: number = getTotalPrice( arrIngredients )

  arrIngredients = removeDuplicateIngredients( arrIngredients )

  const orderData: OrderDataType = {
    ...order,
    ingredients: arrIngredients,
    totalPrice
  }

  const handleOpenModal = () => {
    dispatch( openOrderDetailsModal( orderData ) )
  }


  function getStatusText ( status: string ) {
    switch ( status ) {
      case 'created': return 'Создан'
      case 'pending': return 'Готовится'
      case 'done': return 'Выполнен'
      default: return ''
    }
  }

  const dateServer: string = ( order.status === 'created' ) ? order.createdAt : order.updatedAt

  return (

    orderData && order &&

    <li className={ styles.order }>

      <Link
        className={ styles.order__link }
        to={ `${ location.pathname }/${ order._id }` }
        state={ { from: location.pathname, } }
        draggable='false'
        onClick={ () => { handleOpenModal() } }
      >

        <div className={ styles.order__details }>
          <p className={ styles.order__id }>
            { order.number ? ( "#" + order.number.toString().padStart( 6, '0' ) ) : '' }
          </p>
          <p className={ styles.order__time }>
            { dateServer && <FormattedDate date={ new Date( dateServer ) } /> }
          </p>
        </div>
        <p className={ styles.order__name }>{ order.name }</p>
        { showStatus &&
          ( <p className={ ( order.status === 'done' ) ? styleStatusDone : styleStatusDefault }>
            { getStatusText( order.status ) }
          </p> ) }
        <OrderInfoIngredients orderData={ orderData } />

      </Link>
    </li>
  )
}

export default OrderInfoItem