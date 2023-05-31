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
import { getSelectedIngrState } from '../../utils/selectors';
import { CONSTRUCTOR_ITEMS_ANIMATION_TIME } from '../../constants/constants'


const ConstructorItem = ({ obj, isLocked }) => {

  const dispatch = useDispatch();
  const [animationStyle, setAnimationStyle] = useState('');
  const [itemOpacity, setItemOpacity] = useState(0);
  const [animationType, setAnimationType] = useState('');

  const { ingredients, animationState } = useSelector(getSelectedIngrState);

  const indexItem = ingredients.indexOf(obj);

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
          setTimeout(() => {
            setAnimationType('');
          }, CONSTRUCTOR_ITEMS_ANIMATION_TIME);
        }
      }
      else if (dragItemData.locationDnd === 'IngredientsBurger') {
        dispatch(addIngredient(dropObj, dragObj, ingredients));
        setTimeout(() => {
          setAnimationType('');
        }, CONSTRUCTOR_ITEMS_ANIMATION_TIME);
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
    
    // определяем тип анимации
    if (animationState.fromIndex == 0 && animationState.toIndex == -1) {
      setItemOpacity(0);
    }
    else if (animationState.fromIndex < indexItem && animationState.toIndex >= indexItem) {
      setAnimationType('moove_up')
    }
    else if (animationState.fromIndex > indexItem && animationState.toIndex <= indexItem) {
      setAnimationType('moove_down')
    }
    else {
      setAnimationType('')
    }

    // Запускаем нужную анимацию
    if (animationType === 'moove_up') {
      setAnimationStyle(stylesItem.item_moove_up)
    }
    else if (animationType === 'moove_down') {
      setAnimationStyle(stylesItem.item_moove_down)
    }
    else {
      setAnimationStyle('')
    };

    // Задаём прозрачность перетаскиваемого объекта
    if (isItemDragging) {
      setItemOpacity(0)
    }
    else if (!isItemDragging && animationState.isItemMooving) {
      setTimeout(() => {
        setItemOpacity(1)
      }, CONSTRUCTOR_ITEMS_ANIMATION_TIME)
    }
    else if (!isItemDragging && !animationState.isItemMooving) {
      setItemOpacity(1)
    }

  }, [isItemDragging, animationType, animationState.isItemMooving, animationState.fromIndex, animationState.toIndex]);


  const ref = useRef(null);
  const dragDropRef = dragRef(dropRef(ref));


  return (
    <li
      className={animationStyle ? `${stylesItem.item} ${animationStyle}` : stylesItem.item}
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
          setTimeout(() => {
            dispatch(removeIngredient(obj, ingredients));
          }, 300);
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
