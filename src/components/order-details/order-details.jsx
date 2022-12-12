import React from 'react';
import PropTypes from 'prop-types';
import orderDetailsStyles from './order-details.module.css';
import donePath from '../../images/done.svg'

const OrderDetails = (props) => {
  return (
    <div className={orderDetailsStyles.container}>
      <p className={orderDetailsStyles.id}>{props.orderId}</p>
      <p className={orderDetailsStyles.title}>идентификатор заказа</p>
      <div className={orderDetailsStyles.imageBox}>
        <img className={orderDetailsStyles.image} src={donePath} alt="Иконка успешного заказа." />
      </div>
      <p className={orderDetailsStyles.info}>Ваш заказ начали готовить</p>
      <p className={orderDetailsStyles.instruction}>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
};

OrderDetails.propTypes = {
  orderId: PropTypes.string.isRequired
};

export default OrderDetails;