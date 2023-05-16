import stylesOrderInfoIngredients from './order-info-ingredients.module.css';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import uniqid from 'uniqid'; /* нужен для генерации key*/
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getIngredientsDataState } from '../../utils/selectors';


const OrderInfoIngredients = ({ ingredients }) => {

  const stylePictureDefault = stylesOrderInfoIngredients.picture;
  const stylePictureOverflow = `${stylesOrderInfoIngredients.picture} ${stylesOrderInfoIngredients.picture_overflow}`;

  let arrIngredients = []; // данные ингредиентов из заказа
  let ArrImages = []; // для рендера первых 5 изображений
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

      //Удаляем одну лишнюю булку
      for (let i = arrIngredients.length - 1; i >= 0; i--) {
        if (arrIngredients[i].type === 'bun') { arrIngredients.splice(i, 1); break; }
      };

      //Формируем массив lдля рендера первых 5 изображений (или меньше)
      for (let i = 0; i < 5 && i < arrIngredients.length; i += 1) {
        if (arrIngredients[i]) {
          ArrImages.push({
            name: arrIngredients[i].name,
            path: arrIngredients[i].path
          });
        }
      };

      //Формируем oбъект c данными для 6го изображения (если есть)
      if (arrIngredients.length > 5) {
        overflowImageObj = {
          name: arrIngredients[5].name,
          path: arrIngredients[5].path,
          count: `+${arrIngredients.length - 5}`,
        }
      };
    };
  };

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