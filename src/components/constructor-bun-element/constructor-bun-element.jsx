import stylesConstructorBunElement from './constructor-bun-element.module.css';
import { useSelector } from 'react-redux';
import { memo } from 'react';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { getSelectedIngrState } from '../../utils/selectors';


function ConstructorBunElement({ type, positionText }) {

  const {bun} = useSelector(getSelectedIngrState);

  let nameTxt;
  let positionTxt;

  if (bun._id) {
    nameTxt = bun.name;
    positionTxt = positionText;
  }
  else {
    nameTxt = 'Выберите и перенесите сюда булку ';
    positionTxt = '';
  }

  return (
    <div className={stylesConstructorBunElement.boxElement}
      style={{ opacity: bun._id ? 1 : .6 }} >
      <ConstructorElement
        isLocked={true}
        type={type}
        text={`${nameTxt} ${positionTxt}`}
        price={bun.price}
        thumbnail={bun.image}
      />
    </div>
  )
};

ConstructorBunElement.propTypes = {
  type: PropTypes.string.isRequired,
  positionText: PropTypes.string.isRequired
};

export default memo(ConstructorBunElement);