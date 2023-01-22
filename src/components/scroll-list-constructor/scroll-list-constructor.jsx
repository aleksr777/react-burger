import scrollListStyles from './scroll-list-constructor.module.css';
import { useSelector } from 'react-redux';
import ItemConstructor from '../item-constructor/item-constructor';
import { noIngrObj } from '../../constants/constants';

const ScrollListConstructor = () => {

  const selectedIngredients = useSelector(state => state.selectedIngr.ingredients);

  return (
    <>
      {!selectedIngredients.length
        ? (
          <ItemConstructor
            obj={noIngrObj}
            key={noIngrObj._uKey}
            isLocked={true}
          />
      ) : (
      <ul
        className={scrollListStyles.list_scroll}
      >
        {selectedIngredients.map((obj) => (
          <ItemConstructor
            obj={obj}
            key={obj._uKey}
            isLocked={false}
          />))}
      </ul>
      )
      }
    </>
  )
};

export default ScrollListConstructor;