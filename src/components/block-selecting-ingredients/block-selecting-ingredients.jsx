import { useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  ADD_INGREDIENT,
  ADD_BUN,
  REMOVE_BUN
} from '../../services/actions/selected-ingr-actions';

/* компонент для проверки функционала (потом удалю)*/
const BlockSelectingIngredients = () => {

  const dispatch = useDispatch();

  const { ingredientsData } = useSelector(state => state.ingredientsData);
  const selectedBun = useSelector(state => state.selectedIngr.bun);

  const fillings = useMemo(() => ingredientsData.filter((obj) => obj.type === 'main'));
  const sauces = useMemo(() => ingredientsData.filter((obj) => obj.type === 'sauce'));
  const buns = useMemo(() => ingredientsData.filter((obj) => obj.type === 'bun'));

  // Добавление ингридиента с добавлением цены в общую стоимость
  function addIngredient(ingredientObj, toPosition) {
    dispatch({ type: ADD_INGREDIENT, payload: { ingredientObj: ingredientObj, toPosition: toPosition } });
  };

  // Добавление булки с добавлением цены в общую стоимость
  function addBun(bunObj) {
    /* если булка не была ранее выбрана, то ... */
    if (!selectedBun._id) {
      dispatch({ type: ADD_BUN, payload: { bunObj: bunObj } });
    }
    /* если булка ранее была выбрана, то ... */
    else if (selectedBun._id && selectedBun._id !== bunObj._id) {
      dispatch({ type: REMOVE_BUN, payload: { price: selectedBun.price } });
      dispatch({ type: ADD_BUN, payload: { bunObj: bunObj } });
    }
  };

  // Удаление булки с вычетом цены из общей стоимости
  function removeBun(price) {
    if (selectedBun._id) {
      dispatch({ type: REMOVE_BUN, payload: { price: price } });
    };
  };

  return (
    <>
      <button onClick={() => addBun(buns[0])}>Добавить булку</button>
      <button onClick={() => removeBun(selectedBun.price)}>Удалить булку</button>
      <button onClick={() => addIngredient(sauces[0], 0)}>Добавить соус</button>
      <button onClick={() => addIngredient(fillings[0], 0)}>Добавить начинку</button>
    </>
  );
};

export default BlockSelectingIngredients;