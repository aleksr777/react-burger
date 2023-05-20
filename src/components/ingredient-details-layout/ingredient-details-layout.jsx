import ingrDetailsStyles from './ingredient-details-layout.module.css';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/prop-types';


const IngredientDetailsLayout = ({ ingredient, titleAlign }) => {
  return (
    <>
      <p
        className={ingrDetailsStyles.title}
        style={{ textAlign: titleAlign }}
      >
        Детали ингредиента
      </p>

      <picture className={ingrDetailsStyles.imageBox}>
        <img className={ingrDetailsStyles.image}
          src={ingredient.image_large}
          alt={ingredient.name}
          draggable='false'
        />
      </picture>

      <p className={ingrDetailsStyles.name}>{ingredient.name}</p>

      <div className={ingrDetailsStyles.composition}>
        <div className={ingrDetailsStyles.composition__item}>
          <p className={ingrDetailsStyles.composition__text}>Калории, ккал</p>
          <p className={ingrDetailsStyles.composition__number}>{ingredient.calories}</p>
        </div>
        <div className={ingrDetailsStyles.composition__item}>
          <p className={ingrDetailsStyles.composition__text}>Белки, г</p>
          <p className={ingrDetailsStyles.composition__number}>{ingredient.proteins}</p>
        </div>
        <div className={ingrDetailsStyles.composition__item}>
          <p className={ingrDetailsStyles.composition__text}>Жиры, г</p>
          <p className={ingrDetailsStyles.composition__number}>{ingredient.fat}</p>
        </div>
        <div className={ingrDetailsStyles.composition__item}>
          <p className={ingrDetailsStyles.composition__text}>Углеводы, г</p>
          <p className={ingrDetailsStyles.composition__number}>{ingredient.carbohydrates}</p>
        </div>
      </div>
    </>
  )
};

export default IngredientDetailsLayout;

IngredientDetailsLayout.propTypes = {
  ingredient: PropTypes.oneOfType([
    ingredientPropTypes.isRequired,
    PropTypes.oneOf([null]) // Разрешение значения null
  ]),
  titleAlign: PropTypes.string.isRequired,
};