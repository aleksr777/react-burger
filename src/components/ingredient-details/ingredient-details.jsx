import React from 'react';
import PropTypes from 'prop-types';
import ingredientDetails from './ingredient-details.module.css';

const IngredientDetails = (props) => {
  console.log(props.ingridient.image_large);
  return (
    <div className={ingredientDetails.container}>

      <p className={ingredientDetails.title}>Детали ингредиента</p>

      <div className={ingredientDetails.imageBox}>
        <img className={ingredientDetails.image} src={props.ingridient.image_large} alt={props.ingridient.name} />
      </div>

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
  ingridient: PropTypes.object.isRequired
};

export default IngredientDetails;