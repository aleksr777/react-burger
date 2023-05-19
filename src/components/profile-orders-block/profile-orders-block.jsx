import stylesProfileOdersBlock from './profile-orders-block.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initWebSocketProfileOrders } from '../../services/profile-orders/profile-orders-actions';
import { openWebSocketProfileOrders, closeWebSocket } from '../../utils/api';
import { getProfileOrdersState } from '../../utils/selectors';
import OrderInfoItem from '../../components/order-info-item/order-info-item';


const ProfileOrdersBlock = () => {

  const dispatch = useDispatch();

  const { orders } = useSelector(getProfileOrdersState);

  useEffect(() => {
    let ws = null;

    const connectAsyncWebSocket = async () => {
      ws = await openWebSocketProfileOrders();
      dispatch(initWebSocketProfileOrders(ws));
    };

    connectAsyncWebSocket();

    return () => {
      closeWebSocket(ws);
    };
  }, []);


  return (
    orders &&
    <ul className={stylesProfileOdersBlock.feed}>
      {orders.map((order) => (
        <OrderInfoItem key={order._id} order={order} showStatus={true} />
      ))}
    </ul>
  );
};

export default ProfileOrdersBlock;
