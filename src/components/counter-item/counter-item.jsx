import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropTypes } from '../../utils/prop-types';

const getSelectedIngredientsState = state => state.selectedIngr.ingredients;
const getSelectedBunState = state => state.selectedIngr.bun;


const CounterItem = ({ obj }) => {

  const selectedIngredients = useSelector(getSelectedIngredientsState);

  const selectedBun = useSelector(getSelectedBunState);

  const ingredients = useMemo(
    () => selectedIngredients.filter((ingredient) => ingredient._id === obj._id), [selectedIngredients]
  );

  let count = 0;

  if (obj.type === 'bun') {
    selectedBun._id === obj._id ? count = 2 : count = 0
  }
  else {
    count = ingredients.length
  };

  return (
    count ? <Counter count={count} size='default' extraClass='m-1' /> : null
  )
};

export default CounterItem;


CounterItem.propTypes = {
  obj: ingredientPropTypes.isRequired,
};