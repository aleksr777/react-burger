import stylesFeedOrders from './feed-orders.module.css';
import OrderInfoItem from '../../components/order-info-item/order-info-item';

const FeedOrders = () => {

  const order = {
    _id: '646520f58a4b62001c839771',
    createdAt: '2023-05-17T18:46:13.296Z',
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0943', '643d69a5c3f7b9001cfa0944'],
    name: 'Death Star Starship Main бургер',
    number: 34535,
    status: 'done',
    updatedAt: '2023-05-17T18:46:13.361Z',
  }

  return (
    <div className={stylesFeedOrders.block}>
      <h2 className={stylesFeedOrders.title}>Лента заказов</h2>
      <ul className={stylesFeedOrders.list}>
        <OrderInfoItem key={order._id} order={order} showStatus={false} />
        <OrderInfoItem key={order._id} order={order} showStatus={false} />
        <OrderInfoItem key={order._id} order={order} showStatus={false} />
        <OrderInfoItem key={order._id} order={order} showStatus={false} />
        <OrderInfoItem key={order._id} order={order} showStatus={false} />
        <OrderInfoItem key={order._id} order={order} showStatus={false} />
      </ul>
    </div>
  )
};

export default FeedOrders;