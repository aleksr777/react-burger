import stylesOrderInfoItem from './order-info-item.module.css';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { openOrderDetailsModal } from '../../services/order-details/order-details-actions';
import OrderInfoIngredients from '../../components/order-info-ingredients/order-info-ingredients';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { orderInfoPropTypes } from '../../utils/prop-types';


const OrderInfoItem = ({ order, showStatus }) => {

  const location = useLocation();
  const dispatch = useDispatch();

  const styleStatusDefault = stylesOrderInfoItem.order__status;
  const styleStatusDone = `${stylesOrderInfoItem.order__status} ${stylesOrderInfoItem.order__status_active}`;

  const handleOpenModal = (order) => {
    dispatch(openOrderDetailsModal(order));
  };


  function getStatusText(status) {
    switch (status) {
      case 'created': return 'Создан';
      case 'pending': return 'Готовится';
      case 'done': return 'Выполнен';
      default: return '';
    }
  }

  const dateServer = (order.status === 'created') ? order.createdAt : order.updatedAt;


  return (

    <li className={stylesOrderInfoItem.order}>

      <Link
        className={stylesOrderInfoItem.order__link}
        to={`${location.pathname}/${order._id}`}
        state={{ from: location.pathname }}
        draggable='false'
        onClick={() => { handleOpenModal(order) }}
      >

        <div className={stylesOrderInfoItem.order__details}>
          <p className={stylesOrderInfoItem.order__id}>
            {order.number ? ("#" + order.number.toString().padStart(6, '0')) : ''}
          </p>
          <p className={stylesOrderInfoItem.order__time}>
            <FormattedDate date={new Date(dateServer)} />
          </p>
        </div>
        <p className={stylesOrderInfoItem.order__name}>{order.name}</p>
        {showStatus &&
          (<p className={(order.status === 'done') ? styleStatusDone : styleStatusDefault}>
            {getStatusText(order.status)}
          </p>)}
        <OrderInfoIngredients ingredients={order.ingredients} />

      </Link>
    </li>
  )
};

export default OrderInfoItem;

OrderInfoItem.propTypes = {
  order: orderInfoPropTypes.isRequired,
  showStatus: PropTypes.bool.isRequired
};