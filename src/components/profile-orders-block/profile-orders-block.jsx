import stylesProfileOdersBlock from './profile-orders-block.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { initWebSocketCommunication } from '../../services/profile-orders/profile-orders-actions';
import { openWebSocketProfileOrders, closeWebSocketProfileOrders } from '../../utils/api';
import OrderInfoItem from '../../components/order-info-item/order-info-item';
import { getProfileOrdersState } from '../../utils/selectors';


const ProfileOrdersBlock = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders } = useSelector(getProfileOrdersState);

  useEffect(() => {
    let ws = null;

    const connectAsyncWebSocket = async () => {
      ws = await openWebSocketProfileOrders();
      dispatch(initWebSocketCommunication(ws));
    };

    connectAsyncWebSocket();

    return () => {
      closeWebSocketProfileOrders(ws);
    };
  }, [dispatch, navigate]);


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
