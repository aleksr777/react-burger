import burgerConstructorStyles from './burger-constructor.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  ADD_INGREDIENT,
  ADD_BUN,
  REMOVE_BUN
} from '../../services/actions/selected-ingr-actions';
import { useDrop } from "react-dnd";
import ModalOrderDetails from '../modal-order-details/modal-order-details';
import OrderingBlock from '../ordering-block/ordering-block';
import ItemsListConstructor from '../items-list-constructor/items-list-constructor';


const BurgerConstructor = () => {

  const dispatch = useDispatch();

  const selectedBun = useSelector(state => state.selectedIngr.bun);

  function addBun(item) {
    dispatch({ type: ADD_BUN, payload: { bunObj: item } });
  }
  function removeBun(price) {
    dispatch({ type: ADD_BUN, payload: { bunObj: price } });
  }
  function addIngredient(item, toPosition) {
    dispatch({ type: ADD_INGREDIENT, payload: { ingredientObj: item, toPosition: toPosition } })
  }

  // Добавление новой булки и ингредиента с добавлением цены в общую стоимость
  const dropHandler = (item, selectedBun) => {
    if (item.type === 'bun') {
      if (!selectedBun._id) {
        addBun(item)
      }
      /* если булка ранее была выбрана, то ... */
      else if (selectedBun._id && selectedBun._id !== item._id) {
        removeBun(selectedBun.price);
        addBun(item);
      }
    }
    /* проверяем является ли инредиент новым по uKey 
    (иначе создаётся новый элемент при перетаскивании в selectedIngredients) */
    else if (!item._uKey) {
      addIngredient(item, 0)
    }
  };

  const [, dropRef] = useDrop({
    accept: 'selectedIngr',
    drop(item) { dropHandler(item, selectedBun) }
  });

  return (
    <>
      <section ref={dropRef} className={burgerConstructorStyles.section}>

        <ItemsListConstructor />

        <OrderingBlock />

      </section>

      <ModalOrderDetails />
    </>
  );
};

export default BurgerConstructor;