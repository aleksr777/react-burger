import styles from './order-details-modal.module.css'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useNavigate, useLocation } from 'react-router-dom'
import { closeOrderDetailsModal } from '../../services/order-details/order-details-actions'
import OrderDetailsLayout from '../order-details-layout/order-details-layout'
import Modal from '../modal/modal'
import { getOrderDetailsState } from '../../utils/selectors'


const OrderDetailsModal = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  /* isModalOpened нужен для анимации
  (иначе информация в модальном окне исчезает раньше, чем окно успевает закрыться) */
  const { order, isModalOpened } = useAppSelector( getOrderDetailsState )

  if ( !order ) {
    return null
  }

  const fromPage: string = location.state?.from || '/'

  function goToPage () {
    navigate( fromPage, { replace: true } )
  }

  const handleCloseModal = () => {
    dispatch( closeOrderDetailsModal( goToPage ) )
  }

  return (
    <Modal handleCloseModal={ handleCloseModal } isModalOpened={ isModalOpened }>
      <div className={ styles.container }>
        <OrderDetailsLayout order={ order } />
      </div>
    </Modal>
  )
}

export default OrderDetailsModal