import scrollListStyles from './scroll-list-constructor.module.css';
import { useSelector } from 'react-redux';
import ItemConstructor from '../item-constructor/item-constructor';
import { noIngrObj } from '../../constants/constants';


const getSelectedIngredientsState = state => state.selectedIngr.ingredients;

const ScrollListConstructor = () => {

  const selectedIngredients = useSelector(getSelectedIngredientsState);

  return (
    <>
      {!selectedIngredients.length
        ? (
          <ul className={scrollListStyles.list_scroll} style={{ opacity: .6 }}>
            <ItemConstructor
              obj={noIngrObj}
              key={noIngrObj._uKey}
              isLocked={true}
              allowDrag={false}
            />
          </ul>
        ) : (
          <ul className={scrollListStyles.list_scroll}>
            {selectedIngredients.map((obj) => (
              <ItemConstructor
                obj={obj}
                key={obj._uKey}
                isLocked={false}
                allowDrag={true}
              />))}
          </ul>
        )
      }
    </>
  )
};

export default ScrollListConstructor;