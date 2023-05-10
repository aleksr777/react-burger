import stylesItem from './constructor-item.module.css';
import { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag, useDrop } from "react-dnd";
import { removeIngredient, swapIngredients } from '../../services/selected-ingr/selected-ingr-actions';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropTypes } from '../../utils/prop-types';

const getSelectedIngredientsState = state => state.selectedIngr.ingredients;


const ConstructorItem = ({ obj, isLocked }) => {

  const dispatch = useDispatch();

  const selectedIngredients = useSelector(getSelectedIngredientsState);

  const [{ dragElementData, dragItemOpacity }, dragRef] = useDrag({
    type: 'selectedIngr',
    item: obj,
    collect: monitor => ({
      dragElementData: monitor.getItem(),
      dragItemOpacity: monitor.isDragging() ? 0 : 1,
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'selectedIngr',
    drop(item) { dropHandler(obj, item) },
  });

  function dropHandler(dropObj, dragObj) {
    /* определяем позицию в массиве */
    const fromPosition = selectedIngredients.indexOf(dragObj);
    const toPosition = selectedIngredients.indexOf(dropObj);
    /* Проверяем, откуда перетаскиваемый объект*/
    if (dragElementData.locationDnd === 'ConstructorBurger') {
      /* исключаем перетаскивание на самого себя */
      if (dropObj._uKey !== dragObj._uKey) {
        dispatch(swapIngredients(dragObj, fromPosition, toPosition, selectedIngredients))
      }
    }
  };

  function isElementDraggingNow(e) {
    /* Проверяем, перетаскиваемый ли это элемент в данный момент */
    if (e.currentTarget.style.opacity !== '0'
      && dragElementData.locationDnd === 'ConstructorBurger') {
      return true;
    }
    return false;
  }

  function dragOverSetOpacity(e) {
    e.preventDefault();
    /* исключаем перетаскиваемый элемент (проверяем стили) и проверяем откуда элемент*/
    if (isElementDraggingNow(e)) {
      e.currentTarget.style.opacity = '.6';
    }
  }

  function dragLeaveSetOpacity(e) {
    e.preventDefault();
    if (isElementDraggingNow(e)) {
      e.currentTarget.style.opacity = '1';
    }
  }

  function dropSetOpacity(e) {
    e.preventDefault();
    if (isElementDraggingNow(e)) {
      e.currentTarget.style.opacity = '1';
    }
  }

  const ref = useRef(null)
  const dragDropRef = dragRef(dropRef(ref))

  return (

    <li
      className={stylesItem.item_scroll}
      ref={!isLocked ? dragDropRef : dropRef}
      onDragOver={(e) => dragOverSetOpacity(e)}
      onDragLeave={(e) => dragLeaveSetOpacity(e)}
      onDrop={(e) => dropSetOpacity(e)}
      style={{
        cursor: !isLocked ? '' : 'default',
        opacity: dragItemOpacity,
      }}
    >

      <div
        style={{ opacity: !isLocked ? 1 : 0 }} >
        <DragIcon type='primary' />
      </div>

      <ConstructorElement
        isLocked={isLocked}
        text={obj.name}
        price={obj.price}
        thumbnail={obj.image}
        handleClose={() => dispatch(removeIngredient(obj._uKey, obj.price, selectedIngredients))}
      />
    </li>
  )
};

ConstructorItem.propTypes = {
  obj: ingredientPropTypes.isRequired,
  isLocked: PropTypes.bool.isRequired,
  isDragable: PropTypes.bool.isRequired,
};

export default memo(ConstructorItem);