import stylesOrderInfoIngredients from './order-info-ingredients.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import uniqid from 'uniqid'; /* нужен для генерации key*/
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getIngredientsDataState } from '../../utils/selectors';


const OrderInfoIngredients = ({ ingredients }) => {

  // Для стилизации текста 'Alt'
  const [isImgError, setIsImgError] = useState(false);

  const handleImageError = () => {
    setIsImgError(true);
  };

  const stylePictureDefault = stylesOrderInfoIngredients.picture;
  const stylePictureOverflow = `${stylesOrderInfoIngredients.picture} ${stylesOrderInfoIngredients.picture_overflow}`;

  let arrIngredients = []; // данные ингредиентов из заказа
  let arrIngredientsUnique = []; // данные ингредиентов из заказа без дублирования
  let arrImages = []; // для рендера первых 5 изображений
  let overflowImageObj = null; // для рендера изображения c переполнением
  let totalPrice = 0;

  const { ingredientsData } = useSelector(getIngredientsDataState);


  if (ingredientsData.length && ingredients.length) {

    /* Формируем массив */
    for (let i = 0; i < ingredients.length; i++) {
      const foundIngredient = ingredientsData.find(function (item) {
        return item._id === ingredients[i];
      });
      foundIngredient &&
        arrIngredients.push({
          name: foundIngredient.name,
          path: foundIngredient.image,
          price: foundIngredient.price,
          type: foundIngredient.type,
        });
    };

    if (arrIngredients.length) {

      //Подсчитываем общую стоимость
      for (let i = 0; i < arrIngredients.length; i++) {
        if (arrIngredients[i].price) {
          totalPrice = ++arrIngredients[i].price;
        }
      };

      // Удаляем повторяющиеся ингредиенты
      arrIngredientsUnique = arrIngredients.filter(function (value, index, self) {
        return self.findIndex(function (obj) {
          return obj.name === value.name;
        }) === index;
      });

      //Формируем массив для рендера первых 5 изображений (или меньше)
      for (let i = 0; i < 5 && i < arrIngredientsUnique.length; i += 1) {
        if (arrIngredientsUnique[i]) {
          arrImages.push({
            name: arrIngredientsUnique[i].name,
            path: arrIngredientsUnique[i].path
          });
        }
      };

      //Формируем oбъект c данными для 6-го изображения (если есть)
      if (arrIngredientsUnique.length > 5) {
        overflowImageObj = {
          name: arrIngredientsUnique[5].name,
          path: arrIngredientsUnique[5].path,
          count: `+${arrIngredientsUnique.length - 5}`,
        }
      };
    };
  }
  else {
    return null
  };


  return (
    <div className={stylesOrderInfoIngredients.order__ingredients}>

      <div className={stylesOrderInfoIngredients.order__items}>
        {
          arrImages.length &&
          arrImages.map((obj) => (
            <div className={stylesOrderInfoIngredients.order__item} key={uniqid.process()}>
              <picture className={stylePictureDefault}>
                <img className={stylesOrderInfoIngredients.picture__img}
                  src={obj.path}
                  alt={obj.name}
                  onError={handleImageError}
                  style={{ color: isImgError ? '#8b8b8b' : '' }}
                />
              </picture>
            </div>
          ))
        }

        {
          overflowImageObj &&
          <div className={stylesOrderInfoIngredients.order__item}>
            {
              (overflowImageObj.count !== '+1') &&
              <p className={stylesOrderInfoIngredients.order__countOverflow}>
                {overflowImageObj.count}
              </p>
            }
            <picture className={
              (overflowImageObj.count !== '+1') ? stylePictureOverflow : stylePictureDefault
            }>
              <img className={stylesOrderInfoIngredients.picture__img}
                src={overflowImageObj.path}
                alt={overflowImageObj.name} />
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