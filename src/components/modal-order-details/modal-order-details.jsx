import { useSelector, useDispatch } from 'react-redux';
import { closeOrderDetailsModal } from '../../services/order-id/order-id-actions';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';


const getOrderIdState = state => state.orderId;

const ModalOrderDetails = () => {

  const dispatch = useDispatch();

  /* isModalOpened нужен для анимации
  (иначе надпись ID заказа в модальном окне исчезает раньше, чем окно успевает закрыться) */
  const { id, isModalOpened } = useSelector(getOrderIdState);

  if (!id) {
    return null
  }

  const handleCloseModal = () => {
    dispatch(closeOrderDetailsModal());
  };

  return (
    <Modal handleCloseModal={handleCloseModal} isModalOpened={isModalOpened}>
      <OrderDetails orderId={String(id)} />
    </Modal>
  )
};

export default ModalOrderDetails;