import stylesProfileOdersBlock from './profile-orders-block.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { requestGetUserOrders } from '../../services/authorization/auth-actions';
import { connectToWebSocket, closeWebSocketConnection } from '../../utils/api';
import { getAuthState } from '../../utils/selectors';
import OrderInfoItem from '../../components/order-info-item/order-info-item';


const ProfileOrdersBlock = () => {

  const dispatch = useDispatch();

  const { orders, isLoading, isError } = useSelector(getAuthState);

  useEffect(() => {

    let ws = null;

    const connectAsyncWebSocket = async () => {
      ws = await connectToWebSocket();
      dispatch(requestGetUserOrders(ws));
    };

    connectAsyncWebSocket();

    // Очищаем соединение при завершении компонента
    return () => {
      closeWebSocketConnection(ws);
    };
  }, []);


  return (
    orders &&
    <ul className={stylesProfileOdersBlock.feed}>
      {orders.map((item) => (
        <OrderInfoItem key={item._id} order={item} showStatus={true} />))}
    </ul>
  )
};

export default ProfileOrdersBlock;