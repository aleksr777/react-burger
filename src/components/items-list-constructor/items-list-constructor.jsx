import itemsListStyles from './items-list-constructor.module.css';
import PropTypes, { arrayOf } from 'prop-types';
import ScrollListConstructor from '../scroll-list-constructor/scroll-list-constructor';
import BunElementConstructor from '../bun-element-constructor/bun-element-constructor';

const ItemsListConstructor = ({ bun, ingredients, removeIngredient }) => {

  return (
    <ul className={itemsListStyles.list}>

      <li className={itemsListStyles.item}>
        <BunElementConstructor bun={bun} type='top' positionText='(верх)' />
      </li>

      <li>
        {
          (!ingredients[0])
            ? (<p className={itemsListStyles.noIngredientsText}>Выберите ингредиенты</p>)
            : (<ScrollListConstructor ingredients={ingredients} removeIngredient={removeIngredient} />)
        }
      </li>

      <li className={itemsListStyles.item}>
        <BunElementConstructor bun={bun} type='bottom' positionText='(низ)' />
      </li>

    </ul>
  )
};

ItemsListConstructor.propTypes = {
  bun: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    _id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
    ]),
  }).isRequired,
  ingredients: arrayOf(PropTypes.shape({
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
    _uKey: PropTypes.string.isRequired,
  }).isRequired),
  removeIngredient: PropTypes.func.isRequired
};

export default ItemsListConstructor;