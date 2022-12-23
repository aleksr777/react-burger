import PropTypes from 'prop-types';
import {
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';

const BunElementConstructor = ({ bun, type, positionText }) => {
  let nameTxt;
  let positionTxt;
  if (bun._id) {
    nameTxt = bun.name;
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
      price={bun.price}
      thumbnail={bun.image}
    />
  )
};

BunElementConstructor.propTypes = {
  bun: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  positionText: PropTypes.string.isRequired
};

export default BunElementConstructor;