import itemsListStyles from './items-list-constructor.module.css';
import ScrollListConstructor from '../scroll-list-constructor/scroll-list-constructor';
import BunElementConstructor from '../bun-element-constructor/bun-element-constructor';

const ItemsListConstructor = () => {

  return (
    <ul className={itemsListStyles.list}>

      <li className={itemsListStyles.item}>
        <BunElementConstructor type='top' positionText='(верх)' />
      </li>

      <li>
        <ScrollListConstructor/>
      </li>

      <li className={itemsListStyles.item}>
        <BunElementConstructor type='bottom' positionText='(низ)' />
      </li>

    </ul>
  )
};

export default ItemsListConstructor;