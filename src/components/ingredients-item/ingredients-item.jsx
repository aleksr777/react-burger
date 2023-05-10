import stylesIngredientsItem from './ingredients-item.module.css';
import PropTypes from 'prop-types';
import { useLocation, Link } from 'react-router-dom';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from "react-dnd";
import { openIngredientDetailsModal } from '../../services/ingredient-details/ingredient-details-actions';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropTypes } from '../../utils/prop-types';


const IngredientsItem = ({ children, ingredient }) => {

  const location = useLocation();
  const dispatch = useDispatch();

  const handleOpenModal = (ingredient) => {
    dispatch(openIngredientDetailsModal(ingredient));
  };

  const [{ dragItemOpacity, dragItemTransition }, dragRef] = useDrag({
    type: 'selectedIngr',
    item: ingredient,
    collect: monitor => ({
      dragItemOpacity: monitor.isDragging() ? 0 : 1,
      dragItemTransition: monitor.isDragging() ? 'none' : '',
    }),
  });

  return (
    <li
      ref={dragRef}
      className={stylesIngredientsItem.item}
      style={{
        transition: dragItemTransition,
        opacity: dragItemOpacity
      }}
    >
      <Link
        className={stylesIngredientsItem.link}
        to={`/ingredients/${ingredient._id}`}
        state={{ from: location.pathname }}
        draggable='false'
        onClick={() => { handleOpenModal(ingredient) }}
        replace
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

      </Link>

    </li >
  )
};

IngredientsItem.propTypes = {
  children: PropTypes.node.isRequired,
  ingredient: ingredientPropTypes.isRequired,
};

export default memo(IngredientsItem);