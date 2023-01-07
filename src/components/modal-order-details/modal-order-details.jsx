import PropTypes from 'prop-types';
import OrderDetails from '../order-details/order-details';
import Modal from '../../ui/modal/modal';

const ModalOrderDetails = ({ orderNumber, handleCloseModal }) => {
  return (
    <Modal handleCloseModal={handleCloseModal}><OrderDetails orderId={String(orderNumber)} /></Modal>
  )
};

ModalOrderDetails.propTypes = {
  orderNumber: PropTypes.number.isRequired,
  handleCloseModal: PropTypes.func.isRequired
};

export default ModalOrderDetails;