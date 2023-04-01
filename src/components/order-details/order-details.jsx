import stylesOrderDetails from './order-details.module.css';
import PropTypes from 'prop-types';
import donePath from '../../images/done.svg'

const OrderDetails = ({ orderId }) => {
  return (
    <div className={stylesOrderDetails.container}>
      <p className={stylesOrderDetails.id}>{orderId}</p>
      <p className={stylesOrderDetails.title}>идентификатор заказа</p>
      <picture className={stylesOrderDetails.imageBox}>
        <img
          className={stylesOrderDetails.image}
          src={donePath}
          alt='Иконка успешного заказа.'
          draggable='false'
        />
      </picture>
      <p className={stylesOrderDetails.info}>Ваш заказ начали готовить</p>
      <p className={stylesOrderDetails.instruction}>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
};

OrderDetails.propTypes = {
  orderId: PropTypes.string.isRequired
};

export default OrderDetails;