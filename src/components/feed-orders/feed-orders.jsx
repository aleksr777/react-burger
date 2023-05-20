import stylesFeedOrders from './feed-orders.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initWebSocketFeedOrders } from '../../services/feed-all-orders/feed-all-orders-actions';
import { openWebSocketFeedOrders, closeWebSocket } from '../../utils/api';
import { getFeedOrdersState } from '../../utils/selectors';
import OrderInfoItem from '../../components/order-info-item/order-info-item';

const FeedOrders = () => {

  const dispatch = useDispatch();

  const { orders } = useSelector(getFeedOrdersState);

  useEffect(() => {

    let ws = null;

    const connectAsyncWebSocket = async () => {
      ws = await openWebSocketFeedOrders();
      dispatch(initWebSocketFeedOrders(ws));
    };

    connectAsyncWebSocket();

    return () => {
      closeWebSocket(ws);
    };
  }, []);

  return (

    <div className={stylesFeedOrders.block}>
      <h2 className={stylesFeedOrders.title}>Лента заказов</h2>
      <ul className={stylesFeedOrders.list}>
        {orders && orders.map((order) => (
          <OrderInfoItem key={order._id} order={order} showStatus={false} />
        ))}
      </ul>
    </div>
  )
};

export default FeedOrders;