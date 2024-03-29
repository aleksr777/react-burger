import styles from './order-details.module.css'
import { useEffect } from 'react'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useLocation, useNavigate } from "react-router-dom"
import { openOrderDetailsModal } from '../../services/order-details/order-details-actions'
import {
  getTotalPrice,
  getArrIngredients,
  removeDuplicateIngredients
} from '../../services/order-details/order-details-service'
import { feedOrdersActions } from '../../services/feed-all-orders/feed-all-orders-actions'
import { profileOrdersActions } from '../../services/feed-profile-orders/feed-profile-orders-actions'
import OrderDetailsLayout from '../../components/order-details-layout/order-details-layout'
import {
  getOrderDetailsState,
  getFeedOrdersState,
  getProfileOrdersState,
  getIngredientsDataState
} from '../../utils/selectors'
import {
  OrdersStateType,
  OrderInfoType
} from '../../types/types'


/* Реализовал этот компонент так, чтобы можно было получить информацию, если переходить на страницу по внешней ссылке*/
const OrderDetailsPage = () => {

  const { pathname }: { pathname: string } = useLocation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const id: string | unknown = pathname.split( '/' ).pop() //достаём id из строки адреса

  const orderDetails = useAppSelector( getOrderDetailsState )
  const profileOrders = useAppSelector( getProfileOrdersState )
  const feedOrders = useAppSelector( getFeedOrdersState )
  const { ingredientsData } = useAppSelector( getIngredientsDataState )

  function getLocation ( pathname: string ): string | unknown {
    if ( pathname.indexOf( 'profile/orders/' ) !== -1 ) {
      return 'profile-orders'
    }
    else if ( pathname.indexOf( 'feed/' ) !== -1 ) {
      return 'feed'
    }
  }

  const location: string | unknown = getLocation( pathname )

  function goToNotFoundPage () {
    navigate( '/not-found-page', { replace: true } )
  };


  function findOrderInfo ( data: OrdersStateType ) {

    if ( data.isSuccess && data.orders ) {

      const [ order ] = data.orders.filter( ( order: OrderInfoType ) => order._id === id )

      if ( order ) {

        let arrIngredients = getArrIngredients( ingredientsData, order )

        const totalPrice = getTotalPrice( arrIngredients )

        arrIngredients = removeDuplicateIngredients( arrIngredients )

        const orderData = {
          ...order,
          ingredients: arrIngredients,
          totalPrice: totalPrice
        }
        dispatch( openOrderDetailsModal( orderData ) )
      }
      else { goToNotFoundPage() };
    }
  }

  // Устанавливаем связь с сервером и получаем данные
  useEffect( () => {

    if ( location === 'profile-orders' ) {
      dispatch( { type: profileOrdersActions.connect } )
    }
    else if ( location === 'feed' ) {
      dispatch( { type: feedOrdersActions.connect } )
    }

    return () => {
      if ( location === 'profile-orders' ) {
        dispatch( { type: profileOrdersActions.disconnect } )
      }
      else if ( location === 'feed' ) {
        dispatch( { type: feedOrdersActions.disconnect } )
      }
    }

  }, [] )


  // Сохраняем данные ингредиента (если найден)
  useEffect( () => {
    if ( !orderDetails.order ) {
      if ( location === 'profile-orders' ) { findOrderInfo( profileOrders ) }
      else if ( location === 'feed' ) { findOrderInfo( feedOrders ) }
    }
  }, [ profileOrders, feedOrders ] )

  return (
    orderDetails.order &&
    <div className={ styles.container }>
      <OrderDetailsLayout order={ orderDetails.order } />
    </div>
  )
}

export default OrderDetailsPage