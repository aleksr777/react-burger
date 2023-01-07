import orderingPriceStyles from './ordering-price.module.css';
import { useSelector } from 'react-redux';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderingPrice = () => {

  const totalPrice = useSelector(state => state.selectedIngr.totalPrice);

  return (
    <div className={orderingPriceStyles.order}>
      <div className={orderingPriceStyles.order__box}>
        <p className={orderingPriceStyles.order__price}>{totalPrice}</p>
        <CurrencyIcon type='primary' />
      </div>
    </div>
  )
};

export default OrderingPrice;