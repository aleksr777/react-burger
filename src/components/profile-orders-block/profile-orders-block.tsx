import styles from './profile-orders-block.module.css'
import { useEffect } from 'react'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { profileOrdersActions } from '../../services/profile-orders/profile-orders-actions'
import { getProfileOrdersState } from '../../utils/selectors'
import OrderInfoItem from '../order-info-item/order-info-item'
import { OrderInfoType } from '../../types/types'


const ProfileOrdersBlock = () => {

  const dispatch = useAppDispatch()

  const { orders } = useAppSelector( getProfileOrdersState )

  useEffect( () => {

    dispatch( { type: profileOrdersActions.connect } )

    return () => {
      dispatch( { type: profileOrdersActions.disconnect } )
    }
  }, [] )

  return (
    orders &&
    <ul className={ styles.feed }>
      { orders.slice().reverse().map( ( order: OrderInfoType ) => (
        <OrderInfoItem key={ order._id } order={ order } showStatus={ true } />
      ) ) }
    </ul>
  )
}

export default ProfileOrdersBlock
