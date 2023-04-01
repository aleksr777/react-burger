import stylesIngredientsItem from './ingredients-item.module.css';
import PropTypes from 'prop-types';
import ConstructorBurgerStyles from '../constructor-burger/constructor-burger.module.css';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from "react-dnd";
import { OPEN_MODAL_INGREDIENT_DETAILS, SET_INGREDIENT_DETAILS } from '../../services/ingredient-details/ingredient-details-actions';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const IngredientsItem = ({ children, ingredient }) => {

  const ConstructorBurgerSelector = [...document.getElementsByClassName(ConstructorBurgerStyles.section)][0];

  const dispatch = useDispatch();

  const [{ dragItemOpacity, dragItemTransition }, dragRef] = useDrag({
    type: 'selectedIngr',
    item: ingredient,
    collect: monitor => ({
      dragItemOpacity: monitor.isDragging() ? 0 : 1,
      dragItemTransition: monitor.isDragging() ? 'none' : '',
    }),
  });

  const handleOpenModal = (ingredient) => {
    dispatch({ type: SET_INGREDIENT_DETAILS, payload: { ingredient: ingredient } });
    dispatch({ type: OPEN_MODAL_INGREDIENT_DETAILS, payload: {} });
  };

  function handleDragStart() {
    ConstructorBurgerSelector.style.opacity = '.7';
    ConstructorBurgerSelector.style.borderRadius = '1.5%';
    ConstructorBurgerSelector.style.boxShadow = '0px 0px 1px 2px rgba(76, 76, 255, .9) inset';
  }

  function handleDragEnd() {
    ConstructorBurgerSelector.style.opacity = '';
    ConstructorBurgerSelector.style.borderRadius = '';
    ConstructorBurgerSelector.style.boxShadow = '';
  }

  return (
    <li
      ref={dragRef}
      className={stylesIngredientsItem.item}
      onDragStart={(e) => handleDragStart(e)}
      onDragEnd={(e) => handleDragEnd(e)}
      onClick={() => { handleOpenModal(ingredient) }}
      style={{
        transition: dragItemTransition,
        opacity: dragItemOpacity
      }}
    >

      {children}

      <img
        className={stylesIngredientsItem.item__image}
        src={ingredient.image_large}
        alt={ingredient.name}
      />

      <div className={stylesIngredientsItem.item__box}>
        <p className={stylesIngredientsItem.item__price}>{ingredient.price}</p>
        <CurrencyIcon type='primary' />
      </div>

      <p className={stylesIngredientsItem.item__title}>{ingredient.name}</p>
    </li>
  )
};

/* IngredientsItem.propTypes = {
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
}; */

export default memo(IngredientsItem);