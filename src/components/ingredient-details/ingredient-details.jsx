import React from 'react';
import PropTypes from 'prop-types';
import ingredientDetails from './ingredient-details.module.css';

const IngredientDetails = (props) => {
  return (
    <div className={ingredientDetails.container}>

      <p className={ingredientDetails.title}>Детали ингредиента</p>

      <picture className={ingredientDetails.imageBox}>
        <img className={ingredientDetails.image} src={props.ingridient.image_large} alt={props.ingridient.name} />
      </picture>

      <p className={ingredientDetails.name}>{props.ingridient.name}</p>

      <div className={ingredientDetails.composition}>
        <div className={ingredientDetails.composition__item}>
          <p className={ingredientDetails.composition__text}>Калории, ккал</p>
          <p className={ingredientDetails.composition__number}>{props.ingridient.calories}</p>
        </div>
        <div className={ingredientDetails.composition__item}>
          <p className={ingredientDetails.composition__text}>Белки, г</p>
          <p className={ingredientDetails.composition__number}>{props.ingridient.proteins}</p>
        </div>
        <div className={ingredientDetails.composition__item}>
          <p className={ingredientDetails.composition__text}>Жиры, г</p>
          <p className={ingredientDetails.composition__number}>{props.ingridient.fat}</p>
        </div>
        <div className={ingredientDetails.composition__item}>
          <p className={ingredientDetails.composition__text}>Углеводы, г</p>
          <p className={ingredientDetails.composition__number}>{props.ingridient.carbohydrates}</p>
        </div>
      </div>
    </div>
  )
};

IngredientDetails.propTypes = {
  ingridient: PropTypes.shape({
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

export default IngredientDetails;