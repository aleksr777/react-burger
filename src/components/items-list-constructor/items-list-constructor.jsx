import itemsListStyles from './items-list-constructor.module.css';
import PropTypes from 'prop-types';
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
  bun: PropTypes.object.isRequired,
  ingredients: PropTypes.array.isRequired,
  removeIngredient: PropTypes.func.isRequired
};

export default ItemsListConstructor;