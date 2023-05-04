import stylesScrollList from './constructor-scroll-list.module.css';
import { useSelector } from 'react-redux';
import ConstructorItem from '../constructor-item/constructor-item';
import { noIngrObj } from '../../constants/constants';

const getSelectedIngredientsState = state => state.selectedIngr.ingredients;


const ConstructorScrollList = () => {

  const selectedIngredients = useSelector(getSelectedIngredientsState);

  return (
    <>
      {!selectedIngredients.length
        ? (
          <ul className={stylesScrollList.list_scroll} style={{ opacity: .6 }}>
            <ConstructorItem
              obj={noIngrObj}
              key={noIngrObj._uKey}
              isLocked={true}
              isDragable={false}
            />
          </ul>
        ) : (
          <ul className={stylesScrollList.list_scroll}>
            {selectedIngredients.map((obj) => (
              <ConstructorItem
                obj={obj}
                key={obj._uKey}
                isLocked={false}
                isDragable={true}
              />))}
          </ul>
        )
      }
    </>
  )
};

export default ConstructorScrollList;