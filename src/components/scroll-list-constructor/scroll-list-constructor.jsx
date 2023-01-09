import scrollListStyles from './scroll-list-constructor.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { REMOVE_INGREDIENT } from '../../services/actions/selected-ingr-actions';
import ItemConstructor from '../item-constructor/item-constructor';

const ScrollListConstructor = () => {

  const dispatch = useDispatch();

  const selectedIngredients = useSelector(state => state.selectedIngr.ingredients);

  // Удаление ингридиента с вычетом цены из общей стоимости
  function removeIngredient(uKey, price) {
    if (selectedIngredients[0]) {
      dispatch({ type: REMOVE_INGREDIENT, payload: { price: price, uKey: uKey } });
    };
  };

  return (
    <>
      {
        !selectedIngredients[0]
          ? (<p className={scrollListStyles.noIngredientsText}>Выберите ингредиенты</p>)
          : (<ul className={scrollListStyles.list_scroll}>
            {selectedIngredients.map((obj) => (
              <ItemConstructor
                text={obj.name}
                price={obj.price}
                thumbnail={obj.image}
                id={obj._id}
                key={obj._uKey}
                uKey={obj._uKey}
                removeIngredient={removeIngredient}
              />))}
          </ul>)
      }
    </>
  )
};

export default ScrollListConstructor;