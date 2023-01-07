import orderingBlockStyles from './ordering-block.module.css';
import OrderingPrice from '../ordering-price/ordering-price';
import OrderingButton from '../ordering-button/ordering-button';

const OrderingBlock = () => {
  return (
    <div className={orderingBlockStyles.order}>
      <OrderingPrice />
      <OrderingButton />
    </div>
  )
};

export default OrderingBlock;