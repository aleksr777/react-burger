import stylesOrderInfoItem from './order-info-item.module.css';
import PropTypes from 'prop-types';
import OrderInfoIngredients from '../../components/order-info-ingredients/order-info-ingredients';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { orderInfoPropTypes } from '../../utils/prop-types';


const OrderInfoItem = ({ order, showStatus }) => {

  const styleStatusDefault = stylesOrderInfoItem.order__status;
  const styleStatusDone = `${stylesOrderInfoItem.order__status} ${stylesOrderInfoItem.order__status_active}`;

  const { ingredients, status, name, createdAt, updatedAt, number } = order;

  function getStatusText(status) {
    switch (status) {
      case 'created': return 'Создан';
      case 'pending': return 'Готовится';
      case 'done': return 'Выполнен';
      default: return '';
    }
  }

  const dateServer = (status === 'created') ? createdAt : updatedAt;


  return (
    order &&
    <li className={stylesOrderInfoItem.order}>
      <div className={stylesOrderInfoItem.order__details}>
        <p className={stylesOrderInfoItem.order__id}>{`#${number}`}</p>
        <p className={stylesOrderInfoItem.order__time}>
          <FormattedDate date={new Date(dateServer)} />
        </p>
      </div>
      <p className={stylesOrderInfoItem.order__name}>{name}</p>
      {showStatus &&
        (<p className={(status === 'done') ? styleStatusDone : styleStatusDefault}>
          {getStatusText(status)}
        </p>)}
      <div className={stylesOrderInfoItem.order__ingredients}>
        <OrderInfoIngredients ingredients={ingredients} />
      </div>
    </li>
  )
};

export default OrderInfoItem;

OrderInfoItem.propTypes = {
  order: orderInfoPropTypes.isRequired,
  showStatus: PropTypes.bool.isRequired
};