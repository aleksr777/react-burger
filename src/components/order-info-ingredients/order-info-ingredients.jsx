import stylesOrderInfoIngredients from './order-info-ingredients.module.css';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import uniqid from 'uniqid'; // для генерации key
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getIngredientsDataState } from '../../utils/selectors';


const OrderInfoIngredients = ({ ingredients }) => {

  const stylePictureDefault = stylesOrderInfoIngredients.picture;
  const stylePictureOverflow = `${stylesOrderInfoIngredients.picture} ${stylesOrderInfoIngredients.picture_overflow}`;

  let arrIngredients = []; // все ингредиенты из заказа
  let arrIngredientsUnique = []; // ингредиенты из заказа без дублирования
  const [imagesData, setImagesData] = useState([]); // для рендера изображений
  let overflowCount = null;
  let totalPrice = 0;

  const handleImageError = (index) => {
    let arr = imagesData;
    arr[index].isImgError = true;
    setImagesData(arr);
  };

  function removeDuplicateIngredients(arr) {
    return arr.filter(function (value, index, self) {
      return self.findIndex(function (obj) {
        return obj.name === value.name;
      }) === index;
    });
  }

  const { ingredientsData } = useSelector(getIngredientsDataState);


  if (ingredientsData.length && ingredients.length) {
    // Формируем массив данных выбранных ингредиентов
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
  };


  if (arrIngredients.length) {
    //Подсчитываем общую стоимость
    for (let i = 0; i < arrIngredients.length; i++) {
      if (arrIngredients[i].price) {
        totalPrice = totalPrice + arrIngredients[i].price;
      }
    };
    //удаляем дупликаты
    arrIngredientsUnique = removeDuplicateIngredients(arrIngredients);
  };


  //Формируем массив для рендера изображений первых 6 ингредиентов (или меньше)
  function getArrRenderImg(arrIngredients) {
    let arr = [];
    if (arrIngredients) {
      for (let i = 0; i < 6 && i < arrIngredients.length; i += 1) {
        if (arrIngredients[i]) {
          arr.push({
            name: arrIngredients[i].name,
            path: arrIngredients[i].path,
            isImgError: false, // нужен для показа текста alt в случае ошибки загрузки изображения
          });
        }
      };
    };
    return arr;
  };


  useEffect(() => {
    arrIngredientsUnique.length && setImagesData(getArrRenderImg(arrIngredientsUnique));
  }, []);


  // счётчик переполнения
  if (arrIngredientsUnique.length && arrIngredientsUnique.length > 6) {
    overflowCount = `+${arrIngredientsUnique.length - 5}`;
  };

  return (

    imagesData &&
    
    <div className={stylesOrderInfoIngredients.order__ingredients}>

      <div className={stylesOrderInfoIngredients.order__items}>
        {
          imagesData.map((obj, index) => (
            <div className={stylesOrderInfoIngredients.order__item} key={uniqid.process()}>
              {
                (overflowCount && index === 5) &&
                <p className={stylesOrderInfoIngredients.order__countOverflow}>{overflowCount}</p>
              }
              <picture className={(overflowCount && index === 5) ? stylePictureOverflow : stylePictureDefault}>
                <img
                  className={stylesOrderInfoIngredients.picture__img}
                  src={obj.path}
                  alt={obj.name}
                  draggable='false'
                  onError={() => handleImageError(index)}
                  style={{ color: obj.isImgError ? '#8585AD' : '' }} // по-умолчанию текст прозрачный
                />
              </picture>
            </div>
          ))}
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