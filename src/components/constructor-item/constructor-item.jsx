import stylesItem from './constructor-item.module.css';
import { memo, useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag, useDrop } from "react-dnd";
import {
  removeIngredient,
  swapIngredients,
  addIngredient,
} from '../../services/selected-ingr/selected-ingr-actions';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getSelectedIngrState, getCounterState } from '../../utils/selectors';


const ConstructorItem = ({ obj, isLocked }) => {

  const dispatch = useDispatch();
  const [itemOpacity, setItemOpacity] = useState(0);

  const { ingredients } = useSelector(getSelectedIngrState);
  const { counter } = useSelector(getCounterState);

  const [{ dragItemData, isItemDragging }, dragRef] = useDrag({
    type: 'selectedIngr',
    item: obj,
    canDrag: () => {
      if (isLocked || obj.type === 'bun') {
        return false;
      }
      return true;
    },
    collect: monitor => ({
      dragItemData: monitor.getItem(),
      isItemDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'selectedIngr',
    drop(dragObj) {
      dropHandler(obj, dragObj)
    }
  });


  function dropHandler(dropObj, dragObj) {
    if (dragObj.type !== 'bun') {
      if (dragItemData.locationDnd === 'ConstructorBurger') {
        if (dropObj._uKey !== dragObj._uKey) {// исключаем перетаскивание на самого себя
          dispatch(swapIngredients(dropObj, dragObj, ingredients));
        }
      }
      else if (dragItemData.locationDnd === 'IngredientsBurger') {
        dispatch(addIngredient(dropObj, dragObj, ingredients, counter));
      };
    }
  };

  function dragOverSetOpacity(e) {
    e.preventDefault();
    if (!isItemDragging && dragItemData.type !== 'bun') {
      e.currentTarget.style.opacity = '.6';
    }
  };

  function dragLeaveSetOpacity(e) {
    e.preventDefault();
    if (!isItemDragging) {
      e.currentTarget.style.opacity = '1';
    }
  };

  function dropSetOpacity(e) {
    e.preventDefault();
    if (!isItemDragging) {
      e.currentTarget.style.opacity = '1';
    }
  };


  useEffect(() => {
    // Задаём прозрачность перетаскиваемого объекта
    if (isItemDragging) {
      setItemOpacity(0)
    }
    else if (!isItemDragging) {
      setItemOpacity(1)
    }
    else if (!isItemDragging) {
      setItemOpacity(1)
    }
  }, [isItemDragging]);


  const ref = useRef(null);
  const dragDropRef = dragRef(dropRef(ref));


  return (
    <li
      className={stylesItem.item}
      ref={dragDropRef}
      onDragOver={(e) => dragOverSetOpacity(e)}
      onDragLeave={(e) => dragLeaveSetOpacity(e)}
      onDrop={(e) => dropSetOpacity(e)}
      style={{
        cursor: isLocked || obj.type === 'bun' ? 'default' : '',
        opacity: `${itemOpacity}`,
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
        handleClose={() => {
          setItemOpacity(0);
          dispatch(removeIngredient(obj, ingredients, counter));
        }}
      />
    </li>
  )
};

export default memo(ConstructorItem);

ConstructorItem.propTypes = {
  obj: ingredientPropTypes.isRequired,
  isLocked: PropTypes.bool.isRequired,
};
