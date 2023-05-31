import stylesConstructorBurger from './constructor-burger.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { addBun, removeBun, addIngredient } from '../../services/selected-ingr/selected-ingr-actions';
import { useDrop } from "react-dnd";
import NewOrderDetailsModal from '../new-order-details-modal/new-order-details-modal';
import OrderingPrice from '../ordering-price/ordering-price';
import OrderingButton from '../ordering-button/ordering-button';
import ConstructorItemsList from '../constructor-items-list/constructor-items-list';
import { getSelectedIngrState } from '../../utils/selectors';


const ConstructorBurger = () => {

  const dispatch = useDispatch();

  const { bun, ingredients } = useSelector(getSelectedIngrState);

  // Добавление новой булки и ингредиента с добавлением цены в общую стоимость
  const dropHandler = (item, bun) => {
    if (item.type === 'bun') {
      if (!bun._id) {
        dispatch(addBun(item));
      }
      /* если булка ранее была выбрана, то ... */
      else if (bun._id && bun._id !== item._id) {
        dispatch(removeBun(bun.price));
        dispatch(addBun(item));
      }
    }
    /* проверяем является ли инредиент новым по uKey 
    (иначе создаётся новый элемент при перетаскивании) */
    else if (item.locationDnd === 'IngredientsBurger') {
      dispatch(addIngredient(item, 0, ingredients));
    }
  };

  const [, dropRef] = useDrop({
    accept: 'selectedIngr',
    drop(item) { dropHandler(item, bun) }
  });

  return (
    <>
      <section
        ref={dropRef}
        className={stylesConstructorBurger.section}
      >

        <ConstructorItemsList />

        <div className={stylesConstructorBurger.order}>
          <OrderingPrice />
          <OrderingButton />
        </div>

      </section>

      <NewOrderDetailsModal />
    </>
  );
};

export default ConstructorBurger;