import ingrDetailsStyles from './ingredient-details.module.css';
import PropTypes from 'prop-types';

const IngredientDetails = ({ ingredient, titleAlign }) => {
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

export default IngredientDetails;

IngredientDetails.propTypes = {
  ingredient: PropTypes.oneOfType([
    PropTypes.shape({
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
    }).isRequired,
    PropTypes.oneOf([null]) // Разрешение значения null
  ]),
  titleAlign: PropTypes.string.isRequired,
};