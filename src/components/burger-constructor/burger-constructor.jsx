import { useContext, useState, useReducer, useEffect, useRef } from "react";
import burgerConstructorStyles from './burger-constructor.module.css';
import { apiConfig } from '../../constants/constants';
import { postOrder } from '../../utils/api';
import transparentImgPath from '../../images/transparent-picture.png';
import OrderDetails from '../order-details/order-details';
import OrderingBlock from '../ordering-block/ordering-block';
import ItemsListConstructor from '../items-list-constructor/items-list-constructor';
import { PopupContext } from '../../context/popup-context';
import { IngredientsContext } from '../../context/ingredients-context';

const BurgerConstructor = () => {

  const { ingredientsData, selectedIngredients, setSelectedIngredients, selectedBun, setSelectedBun } = useContext(IngredientsContext);

  const { handleOpenModal, setPopupContent } = useContext(PopupContext);

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
      addIngredient(ingredientsData.fillings[1]);
      addIngredient(ingredientsData.fillings[0]);
      addIngredient(ingredientsData.fillings[2]);
      addIngredient(ingredientsData.sauces[2]);
      addIngredient(ingredientsData.fillings[3]);
      addIngredient(ingredientsData.sauces[1]);
      addIngredient(ingredientsData.sauces[0]);
      addBun(ingredientsData.buns[0]);
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

  const [orderId, setOrderId] = useState();

  function sendOrderRequest() {
    let arrId = [];   
    selectedIngredients.map((obj) => (
      arrId.push(obj._id)
    ));
    arrId.push(selectedBun._id);    
    postOrder(apiConfig, arrId)
      .then(res => {
        handleOpenModal();
        setOrderId(res.order.number);
        setPopupContent(<OrderDetails orderId={String(res.order.number)} />);
      })
      .catch(err => console.log(err))
  };

  return (
    <section className={burgerConstructorStyles.section}>
      {/* <button onClick={() => removeBun(selectedBun.price)}>Удалить булку</button> */}
      <ItemsListConstructor bun={selectedBun} ingredients={selectedIngredients} removeIngredient={removeIngredient} />
      <OrderingBlock totalPrice={totalPrice.count} isOrderActive={isOrderActive()} sendOrderRequest={sendOrderRequest} />
    </section>
  );
};

export default BurgerConstructor;