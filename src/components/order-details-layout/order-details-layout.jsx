import stylesOrderDetailsLayout from './order-details-layout.module.css';
import { memo } from 'react';
import { orderInfoPropTypes } from '../../utils/prop-types';

const OrderDetailsLayout = ({ order }) => {

  console.log(order);

  return (
    <p>OrderDetailsLayout</p>
  )
};

export default memo(OrderDetailsLayout);

OrderDetailsLayout.propTypes = {
  order: orderInfoPropTypes.isRequired
};