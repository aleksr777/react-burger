import ItemStyles from './item-ingredients.module.css';
import burgerConstructorStyles from '../burger-constructor/burger-constructor.module.css';
import { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from "react-dnd";
import { SET_INGREDIENT_DETAILS } from '../../services/actions/ingredient-details-actions';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const ItemIngredients = ({ children, ingredient }) => {

  const burgerConstructorSelector = [...document.getElementsByClassName(burgerConstructorStyles.section)][0];

  const dispatch = useDispatch();

  const [{ dragElementData, isDragging, dragItemOpacity, dragItemTransition, dragBurgerSelectorStyle }, dragRef] = useDrag({
    type: 'selectedIngr',
    item: ingredient,
    collect: monitor => ({
      dragElementData: monitor.getItem(),
      isDragging: monitor.isDragging(),
      dragItemOpacity: monitor.isDragging() ? 0 : 1,
      dragItemTransition: monitor.isDragging() ? 'none' : '',
      dragBurgerSelectorStyle: monitor.isDragging() ? .7 : 1,
    }),
  });

  const handleOpenModal = (ingredient) => {
    dispatch({ type: SET_INGREDIENT_DETAILS, payload: { ingredient: ingredient } });
  };

  function handleDragStart() {
    burgerConstructorSelector.style.opacity = '.8';
    burgerConstructorSelector.style.borderRadius = '3%';
    burgerConstructorSelector.style.boxShadow = '0px 0px 8px 4px rgba(76, 76, 255, .4) inset';
  }

  function handleDragEnd() {
    burgerConstructorSelector.style.opacity = '';
    burgerConstructorSelector.style.borderRadius = '';
    burgerConstructorSelector.style.boxShadow = '';
  }

  return (
    <>
      <li
        ref={dragRef}
        className={ItemStyles.item}
        onDragStart={(evt) => handleDragStart(evt)}
        onDragEnd={(evt) => handleDragEnd(evt)}
        onClick={() => { handleOpenModal(ingredient) }}
        style={{
          transition: dragItemTransition,
          opacity: dragItemOpacity
        }}
      >

        {children}

        <img
          className={ItemStyles.item__image}
          src={ingredient.image_large}
          alt={ingredient.name}
        />

        <div className={ItemStyles.item__box}>
          <p className={ItemStyles.item__price}>{ingredient.price}</p>
          <CurrencyIcon type='primary' />
        </div>

        <p className={ItemStyles.item__title}>{ingredient.name}</p>
      </li>
    </>
  )
};

ItemIngredients.propTypes = {
  ingredient: PropTypes.shape({
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
    _id: PropTypes.string.isRequired,
  }).isRequired
};

export default memo(ItemIngredients);