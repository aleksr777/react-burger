import { useSelector } from 'react-redux';
import { memo } from 'react';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';

const getSelectedBunState = state => state.selectedIngr.bun;

function BunElementConstructor({ type, positionText }) {

  const selectedBun = useSelector(getSelectedBunState);

  let nameTxt;
  let positionTxt;

  if (selectedBun._id) {
    nameTxt = selectedBun.name;
    positionTxt = positionText;
  }
  else {
    nameTxt = 'Выберите булку';
    positionTxt = '';
  }

  return (
    <ConstructorElement
      isLocked={true}
      type={type}
      text={`${nameTxt} ${positionTxt}`}
      price={selectedBun.price}
      thumbnail={selectedBun.image}
    />
  )
};

BunElementConstructor.propTypes = {
  type: PropTypes.string.isRequired,
  positionText: PropTypes.string.isRequired
};

export default memo(BunElementConstructor);