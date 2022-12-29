import orderingBlockStyles from './ordering-block.module.css';
import PropTypes from 'prop-types';
import {
  CurrencyIcon,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';

const OrderingBlock = ({ totalPrice, isOrderActive, sendOrderRequest, orderLoading }) => {
  return (
    <div className={orderingBlockStyles.order}>
      <div className={orderingBlockStyles.order__box}>
        <p className={orderingBlockStyles.order__price}>{totalPrice}</p>
        <CurrencyIcon type='primary' />
      </div>
      {
        (isOrderActive && !orderLoading)
          ? (<Button htmlType='button' type='primary' size='large' onClick={sendOrderRequest}>
            Оформить заказ</Button>)
          : (<Button disabled htmlType='button' type='primary' size='large'>Оформить заказ</Button>)
      }
    </div>
  )
};

OrderingBlock.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  isOrderActive: PropTypes.bool.isRequired,
  sendOrderRequest: PropTypes.func.isRequired
};

export default OrderingBlock;