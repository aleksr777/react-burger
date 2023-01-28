import itemStyles from './item-constructor.module.css';
import { memo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag, useDrop } from "react-dnd";
import {
  REDUCE_PRICE,
  REMOVE_INGREDIENT,
  SWAP_INGREDIENTS
} from '../../services/actions/selected-ingr-actions';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';


const getSelectedIngredientsState = state => state.selectedIngr.ingredients;

const ItemConstructor = ({ obj, isLocked, allowDrag }) => {

  const dispatch = useDispatch();

  const selectedIngredients = useSelector(getSelectedIngredientsState);

  const [{ isDragging, dragElementData }, dragRef] = useDrag({
    type: 'selectedIngr',
    item: obj,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
      dragElementData: monitor.getItem()
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
    if (dragElementData.component === 'BurgerConstructor') {
      /* исключаем перетаскивание на самого себя */
      if (dropObj._uKey !== dragObj._uKey) {
        swapIngredient(dragObj, fromPosition, toPosition);
      }
    }
  };


  function dragOverSetOpacity(evt) {
    /* исключаем перетаскиваемый элемент (изначально ему задан opacity='0') и проверяем откуда элемент*/
    if (evt.currentTarget.style.opacity !== '0' && dragElementData.component === 'BurgerConstructor') {
      evt.preventDefault();
      evt.currentTarget.style.opacity = '.5';
    }
  }

  function dragLeaveSetOpacity(evt) {
    if (evt.currentTarget.style.opacity !== '0' && dragElementData.component === 'BurgerConstructor') {
      evt.preventDefault();
      evt.currentTarget.style.opacity = '';
    }
  }

  function dropSetOpacity(evt) {
    if (evt.currentTarget.style.opacity !== '0' && dragElementData.component === 'BurgerConstructor') {
      evt.preventDefault();
      evt.currentTarget.style.opacity = '';
    }
  }

  const ref = useRef(null)
  const dragDropRef = dragRef(dropRef(ref))

  return (

    <li
      className={itemStyles.item_scroll}
      ref={allowDrag ? dragDropRef : dropRef}
      onDragOver={(evt) => dragOverSetOpacity(evt)}
      onDragLeave={(evt) => dragLeaveSetOpacity(evt)}
      onDrop={(evt) => dropSetOpacity(evt)}
      style={{
        cursor: allowDrag ? '' : 'default',
        transition: isDragging ? 'none' : '',
        opacity: isDragging ? 0 : 1,
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
  isLocked: PropTypes.bool.isRequired
};

export default memo(ItemConstructor);