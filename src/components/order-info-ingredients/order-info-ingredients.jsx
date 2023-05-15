import stylesOrderInfoIngredients from './order-info-ingredients.module.css';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import uniqid from 'uniqid'; /* нужен для генерации key*/
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getIngredientsDataState } from '../../utils/selectors';


const OrderInfoIngredients = ({ ingredients }) => {

  const { ingredientsData } = useSelector(getIngredientsDataState);

  /* Формируем массив данных для первых 5 изображений */
  let ArrImages = [];
  if (ingredientsData && ingredients) {
    for (let i = 0; i < 5; i += 1) {
      const foundIngredient = ingredientsData.find(function (item) {
        return item._id === ingredients[i];
      });
      foundIngredient && ArrImages && ArrImages.push(
        { name: foundIngredient.name, path: foundIngredient.image }
      );
    };
  };

  /* Формируем oбъект c данными для шестого изображения */
  let overflowItem = null;
  if (ingredientsData && ingredients.length > 5) {
    const foundIngredient = ingredientsData.find(function (item) {
      return item._id === ingredients[5];
    });
    if (foundIngredient) {
      overflowItem = {
        name: foundIngredient.name,
        path: foundIngredient.image,
        count: `+${ingredients.length - 5}`,
      }
    };
  };

  /* Подсчитываем общую стоимость*/
  let totalPrice = 0;
  if (ingredientsData && ingredients) {
    for (let i = 0; i < ingredients.length; i += 1) {
      const foundIngredient = ingredientsData.find(function (item) {
        return item._id === ingredients[i];
      });
      totalPrice = totalPrice + foundIngredient.price;
    };
  };

  const stylePictureDefault = stylesOrderInfoIngredients.picture;
  const stylePictureOverflow = `${stylesOrderInfoIngredients.picture} ${stylesOrderInfoIngredients.picture_overflow}`;

  return (
    <div className={stylesOrderInfoIngredients.order__ingredients}>

      <div className={stylesOrderInfoIngredients.order__items}>
        {
          ArrImages.length &&
          ArrImages.map((obj) => (
            <div className={stylesOrderInfoIngredients.order__item} key={uniqid.process()}>
              <picture className={stylePictureDefault}>
                <img className={stylesOrderInfoIngredients.picture__img}
                  src={obj.path}
                  alt={obj.name} />
              </picture>
            </div>
          ))
        }
        {
          overflowItem &&
          <div className={stylesOrderInfoIngredients.order__item}>
            {(overflowItem.count !== '+1') &&
              <p className={stylesOrderInfoIngredients.order__countOverflow}>
                {overflowItem.count}
              </p>}
            <picture className={(overflowItem.count === '+1') ? stylePictureDefault : stylePictureOverflow}>
              <img className={stylesOrderInfoIngredients.picture__img}
                src={overflowItem.path}
                alt={overflowItem.name} />
            </picture>
          </div>
        }
      </div>

      <div className={stylesOrderInfoIngredients.order__priceBlock}>
        <p className={stylesOrderInfoIngredients.priceBlock__number}>{totalPrice}</p>
        <CurrencyIcon type='primary' />
      </div>

    </div>
  )
};

export default OrderInfoIngredients;

OrderInfoIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string),
};