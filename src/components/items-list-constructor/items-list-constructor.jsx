import itemsListStyles from './items-list-constructor.module.css';
import ScrollListConstructor from '../scroll-list-constructor/scroll-list-constructor';
import BunElementConstructor from '../bun-element-constructor/bun-element-constructor';

const ItemsListConstructor = () => {

  return (
    <ul className={itemsListStyles.list}>

      <li className={`${itemsListStyles.item} ${itemsListStyles.item__position_top}`}>
        <BunElementConstructor type='top' positionText='(верх)' draggable={false} />
      </li>

      <li>
        <ScrollListConstructor />
      </li>

      <li className={`${itemsListStyles.item} ${itemsListStyles.item__position_bottom}`}>
        <BunElementConstructor type='bottom' positionText='(низ)' draggable={false} />
      </li>

    </ul>
  )
};

export default ItemsListConstructor;