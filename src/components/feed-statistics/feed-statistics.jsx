import stylesFeedStatistics from './feed-statistics.module.css';
import { useSelector } from 'react-redux';
import { getFeedOrdersState } from '../../utils/selectors';


const FeedStatistics = () => {

  const { orders, total, totalToday } = useSelector(getFeedOrdersState);

  const styleItemDone = `${stylesFeedStatistics.status__item} ${stylesFeedStatistics.status__item_active}`;
  const styleStatusBoxMarginRight = `${stylesFeedStatistics.status__box} ${stylesFeedStatistics.status__box_mr}`;
  const styleTextAboutPaddingBottom = `${stylesFeedStatistics.textAbout} ${stylesFeedStatistics.textAbout_pb}`;

  let ordersDone = [];
  let ordersPending = [];

  if (orders) {
    ordersDone = orders.filter(order => order.status === 'done');
    ordersPending = orders.filter(order => order.status === 'pending');
  };


  return (

    <div className={stylesFeedStatistics.block}>

      <div className={stylesFeedStatistics.status}>

        <div className={styleStatusBoxMarginRight}>
          <p className={styleTextAboutPaddingBottom}>Готовы:</p>
          <ul className={stylesFeedStatistics.status__list}>
            {
              ordersDone.length > 0 && ordersDone.slice(0, 10).map((order) => (
                <li className={styleItemDone} key={order._id}>
                  {order.number && (order.number.toString().padStart(6, '0'))}
                </li>
              ))
            }
          </ul>
          <ul className={stylesFeedStatistics.status__list}>
            {
              (ordersDone.length > 10) && ordersDone.slice(10, 20).map((order) => (
                <li className={styleItemDone} key={order._id}>
                  {order.number && (order.number.toString().padStart(6, '0'))}
                </li>
              ))
            }
          </ul>
        </div>

        <div className={stylesFeedStatistics.status__box}>
          <p className={styleTextAboutPaddingBottom}>В работе:</p>
          <ul className={stylesFeedStatistics.status__list}>
            {
              ordersPending.length > 0 && ordersPending.slice(0, 10).map((order) => (
                <li className={stylesFeedStatistics.status__item} key={order._id}>
                  {order.number && (order.number.toString().padStart(6, '0'))}
                </li>
              ))
            }
          </ul>
          <ul className={stylesFeedStatistics.status__list}>
            {
              (ordersPending.length > 10) && ordersPending.slice(10, 20).map((order) => (
                <li className={stylesFeedStatistics.status__item} key={order._id}>
                  {order.number && (order.number.toString().padStart(6, '0'))}
                </li>
              ))
            }
          </ul>
        </div>
      </div>

      {
        total && <div className={stylesFeedStatistics.countOrders}>
          <p className={stylesFeedStatistics.textAbout}>Выполнено за все время:</p>
          <p className={stylesFeedStatistics.countOrders__number}>{total.toLocaleString('ru-RU')}</p>
        </div>
      }

      {
        totalToday && <div className={stylesFeedStatistics.countOrders}>
          <p className={stylesFeedStatistics.textAbout}>Выполнено за сегодня:</p>
          <p className={stylesFeedStatistics.countOrders__number}>{totalToday.toLocaleString('ru-RU')}</p>
        </div>
      }

    </div>
  )
};

export default FeedStatistics;