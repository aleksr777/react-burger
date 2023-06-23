import { useSelector, useDispatch } from 'react-redux'
import { closeOrderDetailsModal } from '../../services/order-id/order-id-actions'
import NewOrderDetailsLayout from '../new-order-details-layout/new-order-details-layout'
import Modal from '../modal/modal'
import { getOrderIdState } from '../../utils/selectors'


const NewOrderDetailsModal = () => {

  const dispatch = useDispatch()

  /* isModalOpened нужен для анимации
  (иначе надпись ID заказа в модальном окне исчезает раньше, чем окно успевает закрыться) */
  const { id, isModalOpened } = useSelector( getOrderIdState )

  if ( !id ) {
    return null
  }

  const handleCloseModal = () => {
    dispatch( closeOrderDetailsModal() as any )
  }

  return (
    <Modal handleCloseModal={ handleCloseModal } isModalOpened={ isModalOpened }>
      <NewOrderDetailsLayout orderId={ String( id ) } />
    </Modal>
  )
}

export default NewOrderDetailsModal