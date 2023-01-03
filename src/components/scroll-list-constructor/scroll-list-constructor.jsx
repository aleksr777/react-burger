import scrollListStyles from './scroll-list-constructor.module.css';
import PropTypes, { arrayOf } from 'prop-types';
import ItemConstructor from '../item-constructor/item-constructor';

const ScrollListConstructor = ({ ingredients, removeIngredient }) => {

  return (
    <ul className={scrollListStyles.list_scroll}>
      {ingredients.map((obj) => (
        <ItemConstructor
          text={obj.name}
          price={obj.price}
          thumbnail={obj.image}
          key={obj._key}
          id={obj._id}
          removeIngredient={removeIngredient}
        />))}
    </ul>
  )
};

ScrollListConstructor.propTypes = {
  ingredients: arrayOf(PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired),
  removeIngredient: PropTypes.func.isRequired
};

export default ScrollListConstructor;