import stylesItemsList from './constructor-items-list.module.css';
import { useSelector } from 'react-redux';
import ConstructorItem from '../constructor-item/constructor-item';
import { noIngrObj } from '../../constants/constants';
import ConstructorBunElement from '../constructor-bun-element/constructor-bun-element';
import { getSelectedIngrState } from '../../utils/selectors';


const ConstructorItemsList = () => {

  const {ingredients} = useSelector(getSelectedIngrState);

  return (
    <ul className={stylesItemsList.list}>

      <li className={`${stylesItemsList.item} ${stylesItemsList.item__position_top}`}>
        <ConstructorBunElement type='top' positionText='(верх)' />
      </li>

      <li>
        {!ingredients.length
          ? (<ul className={`${stylesItemsList.list_scroll} ${stylesItemsList.list_scroll_disabled}`} >
            <ConstructorItem
              obj={noIngrObj}
              key={noIngrObj._uKey}
              isLocked={true}
              isDragable={false}
            />
          </ul>)
          : (<ul className={stylesItemsList.list_scroll}>
            {ingredients.map((obj) => (
              <ConstructorItem
                obj={obj}
                key={obj._uKey}
                isLocked={false}
                isDragable={true}
              />))}
          </ul>)}
      </li>

      <li className={`${stylesItemsList.item} ${stylesItemsList.item__position_bottom}`}>
        <ConstructorBunElement type='bottom' positionText='(низ)' />
      </li>

    </ul>
  )
};

export default ConstructorItemsList;