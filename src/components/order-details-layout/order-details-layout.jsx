import stylesOrderDetailsLayout from './order-details-layout.module.css';
import { memo } from 'react';
import uniqid from 'uniqid';
import { orderDetailsPropTypes } from '../../utils/prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';


const OrderDetailsLayout = ({ order }) => {

  const { number, name, status, ingredients, totalPrice, createdAt, updatedAt } = order;

  const styleStatusDefault = stylesOrderDetailsLayout.status;
  const styleStatusDone = `${stylesOrderDetailsLayout.status} ${stylesOrderDetailsLayout.status_active}`;

  function getStatusText(status) {
    switch (status) {
      case 'created': return 'Создан';
      case 'pending': return 'Готовится';
      case 'done': return 'Выполнен';
      default: return '';
    }
  }

  const dateServer = (status === 'created') ? createdAt : updatedAt;

  return (
    <>

      <p className={stylesOrderDetailsLayout.orderId}>
        {number ? ("#" + order.number.toString().padStart(6, '0')) : ''}
      </p>
      <h2 className={stylesOrderDetailsLayout.title}>{name}</h2>

      <p className={(order.status === 'done') ? styleStatusDone : styleStatusDefault}>
        {getStatusText(status)}
      </p>

      <p className={stylesOrderDetailsLayout.subtitle}>Состав:</p>

      <ul className={stylesOrderDetailsLayout.ingredientsList}>

        {ingredients.map((ingredient) => (

          <li className={stylesOrderDetailsLayout.ingredientBlock} key={uniqid.process()}>

            <div className={stylesOrderDetailsLayout.imageWrapper}>
              <picture className={stylesOrderDetailsLayout.picture}>
                <img
                  className={stylesOrderDetailsLayout.picture__img}
                  src={ingredient.path}
                  alt={ingredient.name}
                  draggable='false'
                //onError={() => handleImageError(index)}
                //style={{ color: obj.isImgError ? '#8585AD' : '' }} // по-умолчанию текст прозрачный
                />
              </picture>
            </div>

            <p className={stylesOrderDetailsLayout.orderName}>
              {ingredient.name}
            </p>

            <div className={`${stylesOrderDetailsLayout.ingredientBlock__priceBlock} ${stylesOrderDetailsLayout.priceBlock}`}>
              <p className={stylesOrderDetailsLayout.priceBlock__number}>
                {`${ingredient.count} x ${ingredient.price}`}
              </p>
              <CurrencyIcon type='primary' />
            </div>

          </li>
        ))}

      </ul>

      <div className={stylesOrderDetailsLayout.resultBlock}>        
        <p className={stylesOrderDetailsLayout.time}><FormattedDate date={new Date(dateServer)} /></p>
        <div className={`${stylesOrderDetailsLayout.resultBlock__priceBlock} ${stylesOrderDetailsLayout.priceBlock}`}>
          <p className={stylesOrderDetailsLayout.priceBlock__number}>{totalPrice}</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </>
  )
};

export default memo(OrderDetailsLayout);

OrderDetailsLayout.propTypes = {
  order: orderDetailsPropTypes.isRequired
};