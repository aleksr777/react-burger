import stylesNewOrderDetailsLayout from './new-order-details-layout.module.css';
import PropTypes from 'prop-types';
import donePath from '../../images/done.svg'

const NewOrderDetailsLayout = ({ orderId }) => {
  return (
    <div className={stylesNewOrderDetailsLayout.container}>
      <p className={stylesNewOrderDetailsLayout.id}>{orderId}</p>
      <p className={stylesNewOrderDetailsLayout.title}>идентификатор заказа</p>

      <picture className={stylesNewOrderDetailsLayout.imageBox}>
        <img
          className={stylesNewOrderDetailsLayout.image}
          src={donePath}
          alt='Иконка успешного заказа.'
          draggable='false'
        />
      </picture>
      
      <p className={stylesNewOrderDetailsLayout.info}>Ваш заказ начали готовить</p>
      <p className={stylesNewOrderDetailsLayout.instruction}>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
};

export default NewOrderDetailsLayout;

NewOrderDetailsLayout.propTypes = {
  orderId: PropTypes.string.isRequired
};
