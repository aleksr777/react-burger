import { useSelector, useDispatch } from 'react-redux';
import { REMOVE_ORDER_ID } from '../../services/actions/order-id-actions';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';


const getOrderIdState = state => state.orderId.id;

const ModalOrderDetails = () => {

  const dispatch = useDispatch();

  const orderId = useSelector(getOrderIdState);

  const handleCloseModal = () => {
    dispatch({ type: REMOVE_ORDER_ID, payload: {} });
  };

  return (
    <>
      {
        orderId
          ? (<Modal handleCloseModal={handleCloseModal}><OrderDetails orderId={String(orderId)} /></Modal>)
          : null
      }
    </>
  )
};

export default ModalOrderDetails;