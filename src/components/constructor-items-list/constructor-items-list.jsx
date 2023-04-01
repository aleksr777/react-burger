import stylesItemsList from './constructor-items-list.module.css';
import ConstructorScrollList from '../constructor-scroll-list/constructor-scroll-list';
import ConstructorBunElement from '../constructor-bun-element/constructor-bun-element';

const ConstructorItemsList = () => {

  return (
    <ul className={stylesItemsList.list}>

      <li className={`${stylesItemsList.item} ${stylesItemsList.item__position_top}`}>
        <ConstructorBunElement type='top' positionText='(верх)' />
      </li>

      <li>
        <ConstructorScrollList />
      </li>

      <li className={`${stylesItemsList.item} ${stylesItemsList.item__position_bottom}`}>
        <ConstructorBunElement type='bottom' positionText='(низ)' />
      </li>

    </ul>
  )
};

export default ConstructorItemsList;