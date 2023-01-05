import { useContext, useState, useReducer, useMemo } from "react";
import burgerConstructorStyles from './burger-constructor.module.css';
import transparentImgPath from '../../images/transparent-picture.png';
import uniqid from 'uniqid';
import { apiConfig } from '../../constants/constants';
import { postOrder } from '../../utils/api';
import ModalOrderDetails from '../modal-order-details/modal-order-details';
import OrderingBlock from '../ordering-block/ordering-block';
import ItemsListConstructor from '../items-list-constructor/items-list-constructor';
import Preloader from '../preloader/preloader';
import { IngredientsContext } from '../../context/ingredients-context';

const noBunObj = {
  // этот объект сделал для отображения "пустой" булки, если булка не выбрана
  image: transparentImgPath,
  name: '',
  price: 0,
  _id: '',
  type: 'bun',
};

const initialIngrState = {
  totalPrice: 0,
  bun: noBunObj,
  ingredients: [],
};

function selectedIngrReducer(state, action) {
  switch (action.type) {
    case 'addIngredient':
      const newObj = {...action.payload.ingredientObj};
      newObj._uKey = uniqid.process();
      return {
        ...state,
        totalPrice: state.totalPrice + newObj.price,
        ingredients: [...state.ingredients, newObj],
      };
    case 'removeIngredient':
      const newArr = state.ingredients.filter((ingredient) => ingredient._uKey !== action.payload.uKey);
      return {
        ...state,
        totalPrice: state.totalPrice - action.payload.price,
        ingredients: newArr,
      };
    case 'addBun':
      return {
        ...state,
        totalPrice: state.totalPrice + (action.payload.bunObj.price * 2),
        bun: action.payload.bunObj,
      };
    case 'removeBun':
      return {
        ...state,
        totalPrice: state.totalPrice - (action.payload.price * 2),
        bun: noBunObj,
      };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
};

const BurgerConstructor = () => {

  const { ingredientsData } = useContext(IngredientsContext);

  const fillings = useMemo(() => ingredientsData.filter((obj) => obj.type === 'main'));
  const sauces = useMemo(() => ingredientsData.filter((obj) => obj.type === 'sauce'));
  const buns = useMemo(() => ingredientsData.filter((obj) => obj.type === 'bun'));


  const [selectedIngrState, priceDispatch] = useReducer(selectedIngrReducer, initialIngrState);

  // Добавление ингридиента с добавлением цены в общую стоимость
  function addIngredient(ingredientObj) {
    priceDispatch({ type: 'addIngredient', payload: { ingredientObj: ingredientObj } });
  };

  // Удаление ингридиента с вычетом цены из общей стоимости
  function removeIngredient(uKey, price) {
    if (selectedIngrState.ingredients[0]) {
      priceDispatch({ type: 'removeIngredient', payload: { price: price, uKey: uKey } });
    };
  };

  // Добавление булки с добавлением цены в общую стоимость
  function addBun(bunObj) {
    if (!selectedIngrState.bun._id) {
      priceDispatch({ type: 'addBun', payload: { bunObj: bunObj } });
    };
  };

  // Удаление булки с вычетом цены из общей стоимости
  function removeBun(price) {
    if (selectedIngrState.bun._id) {
      priceDispatch({ type: 'removeBun', payload: { price: price } });
    };
  };

  // Проверка для активировации/дезактивации кнопки заказа.
  const isOrderActive = () => {
    if (!selectedIngrState.totalPrice ||
      selectedIngrState.totalPrice <= 0 ||
      !selectedIngrState.ingredients[0] ||
      !selectedIngrState.bun._id) {
      return false
    }
    return true
  };

  // Стейт для отслеживания загрузки ингредиентов с сервера
  const [orderLoading, setOrderLoading] = useState(false);

  const [orderId, setOrderId] = useState();

  const handleOpenModal = (orderNumber) => {
    setOrderId(orderNumber);
  };

  const handleCloseModal = () => {
    setOrderId();
  };

  function sendOrderRequest() {
    setOrderLoading(true);
    const arrId = [selectedIngrState.bun._id, ...selectedIngrState.ingredients.map(obj => obj._id), selectedIngrState.bun._id];
    postOrder(apiConfig, arrId)
      .then(res => { handleOpenModal(res.order.number) })
      .catch(err => console.log(err))
      .finally(() => setOrderLoading(false));
  };

  return (
    <>
      {console.log(selectedIngrState)}
      {orderLoading ? (<Preloader />) : (null)}
      <section className={burgerConstructorStyles.section}>

        {/* кнопки для проверки (потом удалю) */}
        <button onClick={() => addBun(buns[0])}>Добавить булку</button>
        <button onClick={() => removeBun(selectedIngrState.bun.price)}>Удалить булку</button>
        <button onClick={() => addIngredient(sauces[0])}>Добавить соус</button>
        <button onClick={() => addIngredient(fillings[0])}>Добавить начинку</button>

        <ItemsListConstructor
          bun={selectedIngrState.bun}
          ingredients={selectedIngrState.ingredients}
          removeIngredient={removeIngredient} />

        <OrderingBlock
          totalPrice={selectedIngrState.totalPrice}
          isOrderActive={isOrderActive()}
          sendOrderRequest={sendOrderRequest}
          orderLoading={orderLoading} />

      </section>

      {orderId
        ? (<ModalOrderDetails orderNumber={orderId} handleCloseModal={handleCloseModal} />)
        : null}
    </>
  );
};

export default BurgerConstructor;