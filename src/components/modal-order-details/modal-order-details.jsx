import { useSelector, useDispatch } from 'react-redux';
import { REMOVE_ORDER_ID } from '../../services/order-id/order-id-actions';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';


const getOrderIdState = state => state.orderId;
const getModalReducerState = state => state.modal;

const ModalOrderDetails = () => {

  const dispatch = useDispatch();

  const { id } = useSelector(getOrderIdState);
  const { isOpened } = useSelector(getModalReducerState);

  const handleCloseModal = () => {
    dispatch({ type: REMOVE_ORDER_ID, payload: {} });
  };

  return (
    <Modal handleCloseModal={handleCloseModal} isOpened={isOpened}>
      <OrderDetails orderId={String(id)} />
    </Modal>
  )
};

export default ModalOrderDetails;