import stylesConstructorBunElement from './constructor-bun-element.module.css';
import { useSelector } from 'react-redux';
import { memo } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { getSelectedIngrState } from '../../utils/selectors';
import { IngredientObjType, ConstructorBunElementProps } from '../../types/types';

const ConstructorBunElement = ({ type, positionText }: ConstructorBunElementProps) => {
  const { bun }: { bun: IngredientObjType } = useSelector(getSelectedIngrState);

  let nameTxt: string;
  let positionTxt: string;

  if (bun._id) {
    nameTxt = bun.name;
    positionTxt = positionText;
  } else {
    nameTxt = 'Выберите и перенесите сюда булку';
    positionTxt = '';
  }

  return (
    <div className={stylesConstructorBunElement.boxElement} style={{ opacity: bun._id ? 1 : 0.6 }}>
      <ConstructorElement
        isLocked={true}
        type={type}
        text={`${nameTxt} ${positionTxt}`}
        price={bun.price}
        thumbnail={bun.image}
      />
    </div>
  );
};

export default memo(ConstructorBunElement);
