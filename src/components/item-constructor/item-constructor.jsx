import itemStyles from './item-constructor.module.css';
import { memo } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  REMOVE_INGREDIENT,
  ADD_INGREDIENT
} from '../../services/actions/selected-ingr-actions';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';


const ItemConstructor = ({ obj, dragObj, setDragObj }) => {

  const dispatch = useDispatch();

  const selectedIngredients = useSelector(state => state.selectedIngr.ingredients);

  // Удаление ингридиента с вычетом цены из общей стоимости
  function removeIngredient(uKey, price) {
    if (selectedIngredients.length) {
      dispatch({ type: REMOVE_INGREDIENT, payload: { price: price, uKey: uKey } });
    };
  };

  // Добавление ингридиента с добавлением цены в общую стоимость
  function addIngredient(ingredientObj, toPosition) {
    dispatch({ type: ADD_INGREDIENT, payload: { ingredientObj: ingredientObj, toPosition: toPosition } });
  };

  function dragStartHandler(evt, obj) {
    setDragObj(obj);
  };

  function dragLeaveHandler(evt) {
    evt.preventDefault();
  };

  function dragEndHandler(evt, obj) {
    evt.preventDefault();
    setDragObj(null);
  };

  function dragOverHandler(evt) {
    evt.preventDefault();
  };

  function dropHandler(evt, obj, dragObj) {
    evt.preventDefault();
    if (obj._uKey && obj._uKey !== dragObj._uKey) {
      removeIngredient(dragObj._uKey, dragObj.price);
      addIngredient(dragObj, selectedIngredients.indexOf(obj));
    }
  };

  return (
    <li
      className={itemStyles.item_scroll}
      draggable={true}
      onDragStart={evt => dragStartHandler(evt, obj)}
      onDragLeave={evt => dragLeaveHandler(evt)}
      onDragEnd={evt => dragEndHandler(evt)}
      onDragOver={evt => dragOverHandler(evt)}
      onDrop={evt => dropHandler(evt, obj, dragObj)}
    >
      <DragIcon
        type='primary'
      />
      <ConstructorElement
        text={obj.name}
        price={obj.price}
        thumbnail={obj.image}
        handleClose={() => removeIngredient(obj._uKey, obj.price)}
      />
    </li>
  )
};

ItemConstructor.propTypes = {
  obj: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired
  }).isRequired,
  dragObj: PropTypes.oneOfType([
    PropTypes.shape({
      calories: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      proteins: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
      _id: PropTypes.string.isRequired
    }).isRequired,
    PropTypes.oneOf([null]).isRequired
  ]),
  setDragObj: PropTypes.func.isRequired
};

export default memo(ItemConstructor);