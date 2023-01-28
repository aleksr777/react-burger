import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from "react-dnd";
import { SET_INGREDIENT_DETAILS } from '../../services/actions/ingredient-details-actions';
import PropTypes from 'prop-types';
import ItemStyles from './item-ingredients.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const ItemIngredients = ({ children, ingredient }) => {

  const dispatch = useDispatch();

  const [{ isDragging }, dragRef] = useDrag({
    type: 'selectedIngr',
    item: ingredient,
    collect: monitor => ({
      isDragging: monitor.isDragging()
    }),
  });

  const handleOpenModal = (ingredient) => {
    dispatch({ type: SET_INGREDIENT_DETAILS, payload: { ingredient: ingredient } });
  };

  return (
    <li
      ref={dragRef}
      className={ItemStyles.item}
      onClick={() => { handleOpenModal(ingredient) }}
      style={{
        transition: isDragging ? 'none' : '',
        opacity: isDragging ? 0 : 1,
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