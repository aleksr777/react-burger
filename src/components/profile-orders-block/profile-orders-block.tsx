import styles from './profile-orders-block.module.css'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { profileOrdersActions } from '../../services/profile-orders/profile-orders-actions'
import { getProfileOrdersState } from '../../utils/selectors'
import OrderInfoItem from '../order-info-item/order-info-item'
import { ProfileOrdersStateType } from '../../types/types'


const ProfileOrdersBlock = () => {

  const dispatch = useDispatch()

  const { orders }: ProfileOrdersStateType = useSelector( getProfileOrdersState )

  useEffect( () => {

    dispatch( { type: profileOrdersActions.connect } )

    return () => {
      dispatch( { type: profileOrdersActions.disconnect } )
    }
  }, [] )

  return (
    orders &&
    <ul className={ styles.feed }>
      { orders.slice().reverse().map( ( order ) => (
        <OrderInfoItem key={ order._id } order={ order } showStatus={ true } />
      ) ) }
    </ul>
  )
}

export default ProfileOrdersBlock