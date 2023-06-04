import { memo } from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';


const CounterItem = ({ count }) => {

  return (
    count > 0 ? <Counter count={count} size='default' extraClass='m-1' /> : null
  )
};

export default memo(CounterItem);

CounterItem.propTypes = {
  count: PropTypes.number.isRequired,
};