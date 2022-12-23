import scrollListStyles from './scroll-list-constructor.module.css';
import PropTypes from 'prop-types';
import ItemConstructor from '../item-constructor/item-constructor';

const ScrollListConstructor = ({ ingredients, removeIngredient }) => {
  return (
    <ul className={scrollListStyles.list_scroll}>
      {ingredients.map((obj) => (
        <ItemConstructor
          text={obj.name}
          price={obj.price}
          thumbnail={obj.image}
          key={obj._id}
          id={obj._id}
          removeIngredient={removeIngredient}
        />))}
    </ul>
  )
};

ScrollListConstructor.propTypes = {
  ingredients: PropTypes.array.isRequired,
  removeIngredient: PropTypes.func.isRequired 
};

export default ScrollListConstructor;