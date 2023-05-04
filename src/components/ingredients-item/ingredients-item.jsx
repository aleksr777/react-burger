import stylesIngredientsItem from './ingredients-item.module.css';
import PropTypes from 'prop-types';
import { useLocation, Link, useParams } from 'react-router-dom';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from "react-dnd";
import { openIngredientDetailsModal } from '../../services/ingredient-details/ingredient-details-actions';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


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
        state={{ from: location }}
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

    </li>
  )
};

IngredientsItem.propTypes = {
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

export default memo(IngredientsItem);