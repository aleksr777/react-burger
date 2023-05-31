import stylesItemsList from './constructor-items-list.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBun, removeBun } from '../../services/selected-ingr/selected-ingr-actions';
import { useDrop } from "react-dnd";
import ConstructorItem from '../constructor-item/constructor-item';
import { noIngrObj } from '../../constants/constants';
import ConstructorBunElement from '../constructor-bun-element/constructor-bun-element';
import { getSelectedIngrState } from '../../utils/selectors';


const ConstructorItemsList = () => {

  const styleItemPositionTop = `${stylesItemsList.item} ${stylesItemsList.item__position_top}`;
  const styleItemPositionBottom = `${stylesItemsList.item} ${stylesItemsList.item__position_bottom}`;
  const styleListDisabled = `${stylesItemsList.listScroll} ${stylesItemsList.listScroll_disabled}`;

  const dispatch = useDispatch();

  const { bun, ingredients, animationState } = useSelector(getSelectedIngrState);

  const [isBun, setIsBun] = useState(false);
  const [isIngrBurger, setIsIngrBurger] = useState(false);
  const [listScrollStyle, setListScrollStyle] = useState(stylesItemsList.listScroll);

  // Добавление булки с добавлением цены в общую стоимость
  const dropHandler = (bun, dragObj) => {
    if (dragObj.type === 'bun') {
      if (!bun._id) {
        dispatch(addBun(dragObj));
      }
      else if (bun._id && bun._id !== dragObj._id) {
        dispatch(removeBun(bun.price));
        dispatch(addBun(dragObj));
      }
    }
  };

  const [, dropRef] = useDrop({
    accept: 'selectedIngr',
    drop(dragObj) {
      dropHandler(bun, dragObj);
    },
    canDrop(dragObj) {
      if (dragObj.locationDnd === 'IngredientsBurger' && dragObj.type === 'bun') {
        setIsIngrBurger(false);
        setIsBun(true);
        return true;
      }
      if (dragObj.locationDnd === 'IngredientsBurger' && dragObj.type !== 'bun') {
        setIsIngrBurger(true)
        setIsBun(false);
        return true;
      }
      setIsIngrBurger(false)
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


  useEffect(() => {
    if (animationState.isItemMooving && isIngrBurger && animationState.isItemAdd && ingredients.length > 0 && ingredients.length < 6) {
      setListScrollStyle(`${stylesItemsList.listScroll} ${stylesItemsList.listScroll_padding_bottom}`)
    }
    else if (animationState.isItemMooving && isIngrBurger && animationState.isItemRemove && ingredients.length > 1 && ingredients.length < 6) {
      setListScrollStyle(`${stylesItemsList.listScroll} ${stylesItemsList.listScroll_margin_bottom}`)
    }
    else {
      setListScrollStyle(stylesItemsList.listScroll)
    };
  }, [animationState.isItemMooving, animationState.isItemAdd, animationState.isItemRemove]);


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
            <ul className={listScrollStyle}>
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