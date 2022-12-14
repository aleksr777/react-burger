import itemStyles from './item-constructor.module.css';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

const ItemConstructor = ({ text, price, thumbnail, id, removeIngredient }) => {
  return (
    <li className={itemStyles.item_scroll}    >
      <DragIcon type='primary' />
      <ConstructorElement text={text} price={price} thumbnail={thumbnail} handleClose={() => removeIngredient(id, price)} />
    </li>
  )
};

ItemConstructor.propTypes = {
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  removeIngredient: PropTypes.func.isRequired
};

export default ItemConstructor;