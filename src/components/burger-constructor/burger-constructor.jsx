import burgerConstructorStyles from './burger-constructor.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { REMOVE_INGREDIENT } from '../../services/actions/selected-ingr-actions';
import ModalOrderDetails from '../modal-order-details/modal-order-details';
import OrderingBlock from '../ordering-block/ordering-block';
import ItemsListConstructor from '../items-list-constructor/items-list-constructor';


const BurgerConstructor = () => {

  const dispatch = useDispatch();

  const selectedBun = useSelector(state => state.selectedIngr.bun);
  const selectedIngredients = useSelector(state => state.selectedIngr.ingredients);

  // Удаление ингридиента с вычетом цены из общей стоимости
  function removeIngredient(uKey, price) {
    if (selectedIngredients[0]) {
      dispatch({ type: REMOVE_INGREDIENT, payload: { price: price, uKey: uKey } });
    };
  };

  return (
    <>
      <section className={burgerConstructorStyles.section}>

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