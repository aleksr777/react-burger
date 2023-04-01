import stylesItem from './constructor-item.module.css';
import { memo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag, useDrop } from "react-dnd";
import {
  REDUCE_PRICE,
  REMOVE_INGREDIENT,
  SWAP_INGREDIENTS
} from '../../services/selected-ingr/selected-ingr-actions';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';


const getSelectedIngredientsState = state => state.selectedIngr.ingredients;

const ConstructorItem = ({ obj, isLocked, allowDrag }) => {

  const dispatch = useDispatch();

  const selectedIngredients = useSelector(getSelectedIngredientsState);

  const [{ dragElementData, dragItemOpacity, dragItemTransition }, dragRef] = useDrag({
    type: 'selectedIngr',
    item: obj,
    collect: monitor => ({
      dragElementData: monitor.getItem(),
      dragItemOpacity: monitor.isDragging() ? 0 : 1,
      dragItemTransition: monitor.isDragging() ? 'none' : '',
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'selectedIngr',
    drop(item) { dropHandler(obj, item) },
  });

  // Удаление ингридиента с вычетом цены из общей стоимости
  function removeIngredient({ _uKey, price }) {
    dispatch({ type: REMOVE_INGREDIENT, payload: { uKey: _uKey } });
    dispatch({ type: REDUCE_PRICE, payload: { price: price } });
  };

  // Изменение позиции элемента в списке
  function swapIngredient(dragObj, fromPosition, toPosition) {
    dispatch({
      type: SWAP_INGREDIENTS,
      payload: {
        ingredientObj: dragObj,
        fromPosition: fromPosition,
        toPosition: toPosition
      }
    });
  };

  function dropHandler(dropObj, dragObj) {
    /* определяем позицию в массиве */
    const fromPosition = selectedIngredients.indexOf(dragObj);
    const toPosition = selectedIngredients.indexOf(dropObj);
    /* Проверяем, откуда перетаскиваемый объект*/
    if (dragElementData.locationDnd === 'ConstructorBurger') {
      /* исключаем перетаскивание на самого себя */
      if (dropObj._uKey !== dragObj._uKey) {
        swapIngredient(dragObj, fromPosition, toPosition);
      }
    }
  };


  function dragOverSetOpacity(e) {
    e.preventDefault();
    /* исключаем перетаскиваемый элемент (изначально ему задан opacity='0') и проверяем откуда элемент*/
    if (e.currentTarget.style.opacity !== '0' && dragElementData.locationDnd === 'ConstructorBurger') {
      e.currentTarget.style.opacity = '.6';
    }
  }

  function dragLeaveSetOpacity(e) {
    e.preventDefault();
    if (e.currentTarget.style.opacity !== '0' && dragElementData.locationDnd === 'ConstructorBurger') {
      e.currentTarget.style.opacity = '1';
    }
  }

  function dropSetOpacity(e) {
    e.preventDefault();
    if (e.currentTarget.style.opacity !== '0' && dragElementData.locationDnd === 'ConstructorBurger') {
      e.currentTarget.style.opacity = '1';
    }
  }

  const ref = useRef(null)
  const dragDropRef = dragRef(dropRef(ref))

  return (

    <li
      className={stylesItem.item_scroll}
      ref={allowDrag ? dragDropRef : dropRef}
      onDragOver={(e) => dragOverSetOpacity(e)}
      onDragLeave={(e) => dragLeaveSetOpacity(e)}
      onDrop={(e) => dropSetOpacity(e)}
      style={{
        cursor: allowDrag ? '' : 'default',
        transition: dragItemTransition,
        opacity: dragItemOpacity,
      }}
    >

      <div
        style={{
          cursor: allowDrag ? '' : 'default',
          opacity: allowDrag ? 1 : 0,
        }} >
        <DragIcon type='primary' />
      </div>

      <ConstructorElement
        isLocked={isLocked}
        text={obj.name}
        price={obj.price}
        thumbnail={obj.image}
        handleClose={() => removeIngredient(obj)}
      />
    </li>
  )
};

ConstructorItem.propTypes = {
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
  isLocked: PropTypes.bool.isRequired
};

export default memo(ConstructorItem);