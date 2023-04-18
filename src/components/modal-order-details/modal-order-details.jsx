import { useSelector, useDispatch } from 'react-redux';
import { CLOSE_MODAL_ORDER_ID, REMOVE_ORDER_ID } from '../../services/order-id/order-id-actions';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { MODAL_ANIMATION_TIME } from '../../constants/constants';


const getOrderIdState = state => state.orderId;

const ModalOrderDetails = () => {

  const dispatch = useDispatch();

  /* isModalOpened нужен для анимации */
  const { id, isModalOpened } = useSelector(getOrderIdState);

  const handleCloseModal = () => {
    dispatch({ type: CLOSE_MODAL_ORDER_ID, payload: {} });
    setTimeout(() => {
      dispatch({ type: REMOVE_ORDER_ID, payload: {} });
    }, MODAL_ANIMATION_TIME);
  };

  /* прерываем код, если id не определён */
  if (!id) {
    return null
  }

  return (
    <Modal handleCloseModal={handleCloseModal} isModalOpened={isModalOpened}>
      <OrderDetails orderId={String(id)} />
    </Modal>
  )
};

export default ModalOrderDetails;