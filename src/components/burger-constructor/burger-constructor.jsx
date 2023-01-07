import burgerConstructorStyles from './burger-constructor.module.css';
import { useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  ADD_BUN,
  REMOVE_BUN
} from '../../services/actions/selected-ingr-actions';
import ModalOrderDetails from '../modal-order-details/modal-order-details';
import OrderingBlock from '../ordering-block/ordering-block';
import ItemsListConstructor from '../items-list-constructor/items-list-constructor';


const BurgerConstructor = () => {

  const dispatch = useDispatch();

  const ingredientsData = useSelector(state => state.ingredientsData.data);
  const selectedBun = useSelector(state => state.selectedIngr.bun);
  const selectedIngredients = useSelector(state => state.selectedIngr.ingredients);

  const fillings = useMemo(() => ingredientsData.filter((obj) => obj.type === 'main'));
  const sauces = useMemo(() => ingredientsData.filter((obj) => obj.type === 'sauce'));
  const buns = useMemo(() => ingredientsData.filter((obj) => obj.type === 'bun'));

  // Добавление ингридиента с добавлением цены в общую стоимость
  function addIngredient(ingredientObj) {
    dispatch({ type: ADD_INGREDIENT, payload: { ingredientObj: ingredientObj } });
  };

  // Удаление ингридиента с вычетом цены из общей стоимости
  function removeIngredient(uKey, price) {
    if (selectedIngredients[0]) {
      dispatch({ type: REMOVE_INGREDIENT, payload: { price: price, uKey: uKey } });
    };
  };

  // Добавление булки с добавлением цены в общую стоимость
  function addBun(bunObj) {
    if (!selectedBun._id) {
      dispatch({ type: ADD_BUN, payload: { bunObj: bunObj } });
    };
  };

  // Удаление булки с вычетом цены из общей стоимости
  function removeBun(price) {
    if (selectedBun._id) {
      dispatch({ type: REMOVE_BUN, payload: { price: price } });
    };
  };

  return (
    <>
      <section className={burgerConstructorStyles.section}>

        {/* кнопки создал для проверки (потом удалю) */}
        <button onClick={() => addBun(buns[0])}>Добавить булку</button>
        <button onClick={() => removeBun(selectedBun.price)}>Удалить булку</button>
        <button onClick={() => addIngredient(sauces[0])}>Добавить соус</button>
        <button onClick={() => addIngredient(fillings[0])}>Добавить начинку</button>

        <ItemsListConstructor
          bun={selectedBun}
          ingredients={selectedIngredients}
          removeIngredient={removeIngredient} />

        <OrderingBlock />

      </section>

      <ModalOrderDetails />
    </>
  );
};

export default BurgerConstructor;