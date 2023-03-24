import { useSelector, useDispatch } from 'react-redux';
import { REMOVE_ORDER_ID } from '../../services/order-id/order-id-actions';
import { REMOVE_MODAL } from '../../services/modal/modal-actions';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';


const getOrderIdState = state => state.orderId;
const getModalState = state => state.modal.isOpened;

const ModalOrderDetails = () => {

  const dispatch = useDispatch();

  const { id } = useSelector(getOrderIdState);
  const isOpened = useSelector(getModalState);

  const handleCloseModal = () => {
    dispatch({ type: REMOVE_MODAL, payload: {} });
    dispatch({ type: REMOVE_ORDER_ID, payload: {} });
  };

  /* прерываем код, если id не определён */
  if (!id) {
    return null
  }

  return (
    <Modal handleCloseModal={handleCloseModal} isModalOpened={isOpened}>
      <OrderDetails orderId={String(id)} />
    </Modal>
  )
};

export default ModalOrderDetails;