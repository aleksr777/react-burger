import { useContext, useState, useReducer, useEffect, useRef, useMemo } from "react";
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

const BurgerConstructor = () => {

  const { ingredientsData } = useContext(IngredientsContext);

  const fillings = useMemo(() => ingredientsData.filter((obj) => obj.type === 'main'));
  const sauces = useMemo(() => ingredientsData.filter((obj) => obj.type === 'sauce'));
  const buns = useMemo(() => ingredientsData.filter((obj) => obj.type === 'bun'));

  // Cтейты для выбранных ингредиентов и булки на основе данных с сервера
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedBun, setSelectedBun] = useState({
    // этот объект сделал для отображения "пустой" булки, если булка не выбрана
    image: transparentImgPath,
    name: '',
    price: 0,
    _id: '',
    type: 'bun'
  });

  function priceReducer(totalPrice, action) {
    switch (action.type) {
      case 'addIngredientPrice':
        return { count: totalPrice.count + action.payload.price };
      case 'removeIngredientPrice':
        return { count: totalPrice.count - action.payload.price };
      case 'addBunPrice':
        return { count: totalPrice.count + (action.payload.price * 2) };
      case 'removeBunPrice':
        return { count: totalPrice.count - (action.payload.price * 2) };
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }

  const [totalPrice, priceDispatch] = useReducer(priceReducer, { count: 0 })

  // Добавление ингридиента с добавлением цены в общую стоимость
  function addIngredient(ingredientObj) {
    ingredientObj._key = uniqid();
    setSelectedIngredients((ingredients) => { return [...ingredients, ingredientObj] });
    priceDispatch({ type: 'addIngredientPrice', payload: { price: ingredientObj.price } });
  };

  // Удаление ингридиента с вычетом цены из общей стоимости
  function removeIngredient(id, price) {
    if (selectedIngredients[0]) {
      setSelectedIngredients(selectedIngredients.filter((ingredient) => ingredient._id !== id));
      priceDispatch({ type: 'removeIngredientPrice', payload: { price: price } });
    };
  };

  // Добавление булки с добавлением цены в общую стоимость
  function addBun(bunObj) {
    setSelectedBun(bunObj);
    priceDispatch({ type: 'addBunPrice', payload: { price: bunObj.price } });
  };

  // Удаление булки с вычетом цены из общей стоимости
  function removeBun(price) {
    if (selectedBun) {
      setSelectedBun({
        image: transparentImgPath,
        name: '',
        price: 0,
        _id: null,
        type: 'bun'
      });
      priceDispatch({ type: 'removeBunPrice', payload: { price: price } });
    };
  };

  /* Имитируем динамический выбор пользователем для наглядности (потом удалю) */
  const effectRun = useRef(false);//чтобы не было повторного рендеринга (иначе стоимость считает дважды)
  useEffect(() => {
    if (effectRun.current === false) {
      // имитируем добавление ингредиентов
      addIngredient(fillings[1]);
      addIngredient(fillings[0]);
      addIngredient(fillings[2]);
      addIngredient(sauces[2]);
      addIngredient(fillings[3]);
      addIngredient(sauces[1]);
      addIngredient(sauces[0]);
      addBun(buns[0]);
      return () => {
        effectRun.current = true
      }
    }
  }, []);
  /* Удаление ингредиентов реализовано через иконку корзины на элементе*/
  /* Как удалять булку (и нужно ли удалять), мне пока не понятно. 
  Временно сделал кнопку для проверки (кнопка закоментирована, потом удалю). */

  // Проверка для активировации/дезактивации кнопки заказа.
  const isOrderActive = () => {
    if (!totalPrice.count || totalPrice.count <= 0 || !selectedIngredients[0] || !selectedBun._id) {
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
    const arrId = [selectedBun._id, ...selectedIngredients.map(obj => obj._id), selectedBun._id];
    postOrder(apiConfig, arrId)
      .then(res => { handleOpenModal(res.order.number) })
      .catch(err => console.log(err))
      .finally(() => setOrderLoading(false));
  };

  return (
    <>    
      {orderLoading ? (<Preloader />) : (null)}
      <section className={burgerConstructorStyles.section}>
        {/* <button onClick={() => removeBun(selectedBun.price)}>Удалить булку</button> */}
        <ItemsListConstructor bun={selectedBun} ingredients={selectedIngredients} removeIngredient={removeIngredient} />
        <OrderingBlock totalPrice={totalPrice.count} isOrderActive={isOrderActive()} sendOrderRequest={sendOrderRequest} orderLoading={orderLoading} />
      </section>

      {orderId
        ? (<ModalOrderDetails orderNumber={orderId} handleCloseModal={handleCloseModal} />)
        : null}
    </>
  );
};

export default BurgerConstructor;