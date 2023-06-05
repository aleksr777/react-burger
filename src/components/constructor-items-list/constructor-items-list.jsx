import stylesItemsList from './constructor-items-list.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBun } from '../../services/selected-ingr/selected-ingr-actions';
import { useDrop } from "react-dnd";
import ConstructorItem from '../constructor-item/constructor-item';
import { noIngrObj } from '../../constants/constants';
import ConstructorBunElement from '../constructor-bun-element/constructor-bun-element';
import { getSelectedIngrState, getCounterState } from '../../utils/selectors';


const ConstructorItemsList = () => {

  const styleItemPositionTop = `${stylesItemsList.item} ${stylesItemsList.item__position_top}`;
  const styleItemPositionBottom = `${stylesItemsList.item} ${stylesItemsList.item__position_bottom}`;
  const styleListDisabled = `${stylesItemsList.listScroll} ${stylesItemsList.listScroll_disabled}`;

  const dispatch = useDispatch();

  const { bun, ingredients } = useSelector(getSelectedIngrState);
  const dropObj = bun; // для лучшей читабельности кода
  const { counter } = useSelector(getCounterState);

  const [isBun, setIsBun] = useState(false);

  // Добавление булки с добавлением цены в общую стоимость
  const dropHandler = (dropObj, dragObj) => {
    if (dragObj.type === 'bun') {
      dispatch(addBun(dropObj, dragObj, counter));
    }
  };

  const [, dropRef] = useDrop({
    accept: 'selectedIngr',
    drop(dragObj) {
      dropHandler(dropObj, dragObj);
    },
    canDrop(dragObj) {
      if (dragObj.locationDnd === 'IngredientsBurger' && dragObj.type === 'bun') {
        setIsBun(true);
        return true;
      }
      if (dragObj.locationDnd === 'IngredientsBurger' && dragObj.type !== 'bun') {
        setIsBun(false);
        return true;
      }
      setIsBun(false);
      return false;
    }
  });

  const handleDragOver = (e) => {
    e.preventDefault();
    isBun ? e.currentTarget.style.opacity = '0.6' : e.currentTarget.style.opacity = '1';
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    if (isBun) { e.currentTarget.style.opacity = '1' }
  };

  function dropSetOpacity(e) {
    e.preventDefault();
    if (isBun) { e.currentTarget.style.opacity = '1' }
  };


  return (
    <ul
      className={stylesItemsList.list}
      ref={dropRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={(e) => dropSetOpacity(e)}
    >

      <li className={styleItemPositionTop}>
        <ConstructorBunElement type='top' positionText='(верх)' />
      </li>

      <li>
        {!ingredients.length
          ? (
            <ul className={styleListDisabled} >
              <ConstructorItem
                obj={noIngrObj}
                key={noIngrObj._uKey}
                isLocked={true}
              />
            </ul>
          )
          : (
            <ul className={stylesItemsList.listScroll}>
              {ingredients.map((obj) => (
                <ConstructorItem
                  obj={obj}
                  key={obj._uKey}
                  isLocked={false}
                />))}
            </ul>
          )}
      </li>

      <li className={styleItemPositionBottom}>
        <ConstructorBunElement type='bottom' positionText='(низ)' />
      </li>

    </ul>
  )
};

export default ConstructorItemsList;

