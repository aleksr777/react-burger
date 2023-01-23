import ingrDetailsStyles from './ingredient-details.module.css';
import PropTypes from 'prop-types';

const IngredientDetails = ({ingredient}) => {
  return (
    <div className={ingrDetailsStyles.container}>

      <p className={ingrDetailsStyles.title}>Детали ингредиента</p>

      <picture className={ingrDetailsStyles.imageBox}>
        <img className={ingrDetailsStyles.image} src={ingredient.image_large} alt={ingredient.name} />
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
    </div>
  )
};

IngredientDetails.propTypes = {
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

export default IngredientDetails;