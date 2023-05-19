import stylesFeedStatistics from './feed-statistics.module.css';

const FeedStatistics = () => {

  const styleItemDone = `${stylesFeedStatistics.status__item} ${stylesFeedStatistics.status__item_active}`;
  const styleStatusBoxMarginRight = `${stylesFeedStatistics.status__box} ${stylesFeedStatistics.status__box_mr}`;
  const styleTextAboutPaddingBottom = `${stylesFeedStatistics.textAbout} ${stylesFeedStatistics.textAbout_pb}`;

  return (

    <div className={stylesFeedStatistics.block}>

      <div className={stylesFeedStatistics.status}>

        <div className={styleStatusBoxMarginRight}>
          <p className={styleTextAboutPaddingBottom}>Готовы:</p>
          <ul className={stylesFeedStatistics.status__list}>
            <li className={styleItemDone}>034533</li>
            <li className={styleItemDone}>034532</li>
            <li className={styleItemDone}>034530</li>
            <li className={styleItemDone}>034527</li>
            <li className={styleItemDone}>034525</li>
          </ul>
        </div>

        <div className={stylesFeedStatistics.status__box}>
          <p className={styleTextAboutPaddingBottom}>В работе:</p>
          <ul className={stylesFeedStatistics.status__list}>
            <li className={stylesFeedStatistics.status__item}>034538</li>
            <li className={stylesFeedStatistics.status__item}>034541</li>
            <li className={stylesFeedStatistics.status__item}>034542</li>
          </ul>
        </div>

      </div>

      <div className={stylesFeedStatistics.countOrders}>
        <p className={stylesFeedStatistics.textAbout}>Выполнено за все время:</p>
        <p className={stylesFeedStatistics.countOrders__number}>28 752</p>
      </div>

      <div className={stylesFeedStatistics.countOrders}>
        <p className={stylesFeedStatistics.textAbout}>Выполнено за сегодня:</p>
        <p className={stylesFeedStatistics.countOrders__number}>138</p>
      </div>

    </div>
  )
};

export default FeedStatistics;