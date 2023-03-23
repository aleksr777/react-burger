import { useSelector, useDispatch } from 'react-redux';
import { REMOVE_ORDER_ID } from '../../services/order-id/order-id-actions';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';


const getOrderIdState = state => state.orderId;

const ModalOrderDetails = () => {

  const dispatch = useDispatch();

  const { id, isModalOpened } = useSelector(getOrderIdState);

  const handleCloseModal = () => {
    dispatch({ type: REMOVE_ORDER_ID, payload: {} });
  };

  return (
    <Modal handleCloseModal={handleCloseModal} isModalOpened={isModalOpened}>
      <OrderDetails orderId={String(id)} />
    </Modal>
  )
};

export default ModalOrderDetails;