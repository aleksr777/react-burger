import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropTypes } from '../../utils/prop-types'; 
import { getSelectedIngrState } from '../../utils/selectors';


const CounterItem = ({ obj }) => {

  const { ingredients, bun } = useSelector(getSelectedIngrState);

  const ingredientsData = useMemo(
    () => ingredients.filter((ingredient) => ingredient._id === obj._id), [ingredients]
  );

  let count = 0;

  if (obj.type === 'bun') {
    bun._id === obj._id ? count = 2 : count = 0
  }
  else {
    count = ingredientsData.length
  };

  return (
    count ? <Counter count={count} size='default' extraClass='m-1' /> : null
  )
};

export default CounterItem;


CounterItem.propTypes = {
  obj: ingredientPropTypes.isRequired,
};