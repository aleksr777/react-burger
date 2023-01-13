import scrollListStyles from './scroll-list-constructor.module.css';
import { useState } from "react";
import { useSelector } from 'react-redux';
import ItemConstructor from '../item-constructor/item-constructor';


const ScrollListConstructor = () => {

  const selectedIngredients = useSelector(state => state.selectedIngr.ingredients);

  const [dragObj, setDragObj] = useState(null);

  return (
    <>
      {
        !selectedIngredients.length
          ? (<p className={scrollListStyles.noIngredientsText}>Выберите ингредиенты</p>)
          : (<ul className={scrollListStyles.list_scroll}>
            {selectedIngredients.map((obj) => (
              <ItemConstructor
                obj={obj}
                key={obj._uKey}
                dragObj={dragObj}
                setDragObj={setDragObj}
              />))}
          </ul>)
      }
    </>
  )
};

export default ScrollListConstructor;