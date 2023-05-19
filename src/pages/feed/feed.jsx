import stylesFeed from './feed.module.css';
import FeedOrders from '../../components/feed-orders/feed-orders';
import FeedStatistics from '../../components/feed-statistics/feed-statistics';

const FeedPage = () => {

  return (
    <>
      <FeedOrders />
      <FeedStatistics />
    </>
  )
};

export default FeedPage;