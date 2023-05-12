import stylesProfileOdersBlock from './profile-orders-block.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const ProfileOrdersBlock = () => {

  const stylePictureDefault = stylesProfileOdersBlock.picture;
  const stylePictureOverflow = `${stylesProfileOdersBlock.picture} ${stylesProfileOdersBlock.picture_overflow}`;

  const styleOrderStatusDefault = stylesProfileOdersBlock.order__status;
  const styleOrderStatusReady = `${stylesProfileOdersBlock.order__status} ${stylesProfileOdersBlock.order__status_active}`;

  const renderItems = (num) => {
    const items = [];
    for (let i = 0; i < num; i++) {
      items.push(
        <div className={stylesProfileOdersBlock.order__item} key={i}>
          <picture className={stylePictureDefault}>
            <img className={stylesProfileOdersBlock.picture__img}
              src='https://code.s3.yandex.net/react/code/bun-01-large.png'
              alt='.' />
          </picture>
        </div>);
    }
    return items;
  };

  const overflowItem = (
    <div className={stylesProfileOdersBlock.order__item}>
      <p className={stylesProfileOdersBlock.order__countOverflow}>{`+${3}`}</p>
      <picture className={stylePictureOverflow}>
      <img className={stylesProfileOdersBlock.picture__img}
        src='https://code.s3.yandex.net/react/code/bun-01-large.png'
        alt='.' />
    </picture>
    </div >);

return (

  <div className={stylesProfileOdersBlock.feed}>


    <div className={stylesProfileOdersBlock.order}>
      <div className={stylesProfileOdersBlock.order__details}>
        <p className={stylesProfileOdersBlock.order__id}>{'#034535'}</p>
        <p className={stylesProfileOdersBlock.order__time}>{'Сегодня, 16:20 i-GMT+3'}</p>
      </div>
      <h2 className={stylesProfileOdersBlock.order__title}>{'Death Star Starship Main бургер'}</h2>
      <p className={styleOrderStatusDefault}>{'Создан'}</p>
      <div className={stylesProfileOdersBlock.order__ingredients}>
        <div className={stylesProfileOdersBlock.order__items}>
          {renderItems(5)}
          {overflowItem}
        </div>
        <div className={stylesProfileOdersBlock.order__priceBlock}>
          <p className={stylesProfileOdersBlock.priceBlock__number}>{480}</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>


    <div className={stylesProfileOdersBlock.order}>
      <div className={stylesProfileOdersBlock.order__details}>
        <p className={stylesProfileOdersBlock.order__id}>{'#034534'}</p>
        <p className={stylesProfileOdersBlock.order__time}>{'Сегодня, 13:20 i-GMT+3'}</p>
      </div>
      <h2 className={stylesProfileOdersBlock.order__title}>{'Interstellar бургер'}</h2>
      <p className={styleOrderStatusDefault}>{'Готовится'}</p>
      <div className={stylesProfileOdersBlock.order__ingredients}>
        <div className={stylesProfileOdersBlock.order__items}>
          {renderItems(5)}
          {overflowItem}
        </div>
        <div className={stylesProfileOdersBlock.order__priceBlock}>
          <p className={stylesProfileOdersBlock.priceBlock__number}>{560}</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>


    <div className={stylesProfileOdersBlock.order}>
      <div className={stylesProfileOdersBlock.order__details}>
        <p className={stylesProfileOdersBlock.order__id}>{'#034533'}</p>
        <p className={stylesProfileOdersBlock.order__time}>{'Вчера, 13:50 i-GMT+3'}</p>
      </div>
      <h2 className={stylesProfileOdersBlock.order__title}>{'Black Hole Singularity острый бургер'}</h2>
      <p className={styleOrderStatusReady}>{'Выполнен'}</p>
      <div className={stylesProfileOdersBlock.order__ingredients}>
        <div className={stylesProfileOdersBlock.order__items}>
          {renderItems(5)}
          {overflowItem}
        </div>
        <div className={stylesProfileOdersBlock.order__priceBlock}>
          <p className={stylesProfileOdersBlock.priceBlock__number}>{510}</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>

    <div className={stylesProfileOdersBlock.order}>
      <div className={stylesProfileOdersBlock.order__details}>
        <p className={stylesProfileOdersBlock.order__id}>{'#034532'}</p>
        <p className={stylesProfileOdersBlock.order__time}>{'2 дня назад, 21:53 i-GMT+3'}</p>
      </div>
      <h2 className={stylesProfileOdersBlock.order__title}>{'Supernova Infinity бургер'}</h2>
      <p className={styleOrderStatusReady}>{'Выполнен'}</p>
      <div className={stylesProfileOdersBlock.order__ingredients}>
        <div className={stylesProfileOdersBlock.order__items}>
          {renderItems(5)}
          {overflowItem}
        </div>
        <div className={stylesProfileOdersBlock.order__priceBlock}>
          <p className={stylesProfileOdersBlock.priceBlock__number}>{600}</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>

    <div className={stylesProfileOdersBlock.order}>
      <div className={stylesProfileOdersBlock.order__details}>
        <p className={stylesProfileOdersBlock.order__id}>{'#034532'}</p>
        <p className={stylesProfileOdersBlock.order__time}>{'2 дня назад, 21:53 i-GMT+3'}</p>
      </div>
      <h2 className={stylesProfileOdersBlock.order__title}>{'Supernova Infinity бургер'}</h2>
      <p className={styleOrderStatusReady}>{'Выполнен'}</p>
      <div className={stylesProfileOdersBlock.order__ingredients}>
        <div className={stylesProfileOdersBlock.order__items}>
          {renderItems(5)}
          {overflowItem}
        </div>
        <div className={stylesProfileOdersBlock.order__priceBlock}>
          <p className={stylesProfileOdersBlock.priceBlock__number}>{600}</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>

  </div>
)
};

export default ProfileOrdersBlock;