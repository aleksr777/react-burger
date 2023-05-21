import stylesOrderDetailsModal from './order-details-modal.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { closeOrderDetailsModal } from '../../services/order-details/order-details-actions';
import OrderDetailsLayout from '../order-details-layout/order-details-layout';
import Modal from '../modal/modal';
import { getOrderDetailsState } from '../../utils/selectors';


const OrderDetailsModal = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  /* isModalOpened нужен для анимации 
  (иначе информация в модальном окне исчезает раньше, чем окно успевает закрыться) */
  const { order, isModalOpened } = useSelector(getOrderDetailsState);

  if (!order) {
    return null
  }

  const fromPage = location.state?.from || '/';

  function goToPage() {
    navigate(fromPage, { replace: true });
  };

  const handleCloseModal = () => {
    dispatch(closeOrderDetailsModal(goToPage));
  };

  return (
    <Modal handleCloseModal={handleCloseModal} isModalOpened={isModalOpened}>
      <div className={stylesOrderDetailsModal.container}>
        <OrderDetailsLayout order={order} />
      </div>
    </Modal>
  )
};

export default OrderDetailsModal;