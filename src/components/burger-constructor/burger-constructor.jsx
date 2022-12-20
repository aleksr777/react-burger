import { useContext, useReducer, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import burgerConstructorStyles from './burger-constructor.module.css';
import transparentPicturePath from '../../images/transparent-picture.png';
import OrderDetails from '../order-details/order-details';
import {
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import { PopupContext } from '../../context/popup-context';
import { IngredientsContext } from '../../context/ingredients-context';

const Item = ({ text, price, thumbnail, id, removeIngredient }) => {
  return (
    <li className={burgerConstructorStyles.item_scroll}    >
      <DragIcon type='primary' />
      <ConstructorElement text={text} price={price} thumbnail={thumbnail} handleClose={() => removeIngredient(id, price)} />
    </li>
  )
};

Item.propTypes = {
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  removeIngredient: PropTypes.func.isRequired
};

const ScrollList = ({ ingredients, removeIngredient }) => {
  return (
    <ul className={burgerConstructorStyles.list_scroll}>
      {ingredients.map((obj) => (
        <Item
          text={obj.name}
          price={obj.price}
          thumbnail={obj.image}
          key={obj._id}
          id={obj._id}
          removeIngredient={removeIngredient}
        />))}
    </ul>
  )
};

ScrollList.propTypes = {
  ingredients: PropTypes.array.isRequired
};

const BunElement = ({ bun, type, positionText }) => {
  let nameTxt;
  let positionTxt;
  if (bun._id) {
    nameTxt = bun.name;
    positionTxt = positionText;
  }
  else {
    nameTxt = 'Выберите булку';
    positionTxt = '';
  }
  return (
    <ConstructorElement
      isLocked={true}
      type={type}
      text={`${nameTxt} ${positionTxt}`}
      price={bun.price}
      thumbnail={bun.image}
    />
  )
};

BunElement.propTypes = {
  bun: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  positionText: PropTypes.string.isRequired
};

const ItemsList = ({ bun, ingredients, removeIngredient }) => {
  return (
    <ul className={burgerConstructorStyles.list}>

      <li className={burgerConstructorStyles.item}>
        <BunElement bun={bun} type='top' positionText='(верх)' />
      </li>

      <li>
        {
          (!ingredients[0])
            ? (<p className={burgerConstructorStyles.noIngredientsText}>Выберите ингредиенты</p>)
            : (<ScrollList ingredients={ingredients} removeIngredient={removeIngredient} />)
        }
      </li>

      <li className={burgerConstructorStyles.item}>
        <BunElement bun={bun} type='bottom' positionText='(низ)' />
      </li>

    </ul>
  )
};

ItemsList.propTypes = {
  bun: PropTypes.object.isRequired,
  ingredients: PropTypes.array.isRequired
};

const OrderingBlock = ({ totalPrice, isOrderActive }) => {
  const { handleOpenModal, setPopupContent } = useContext(PopupContext);
  return (
    <div className={burgerConstructorStyles.order}>
      <div className={burgerConstructorStyles.order__box}>
        <p className={burgerConstructorStyles.order__price}>{totalPrice}</p>
        <CurrencyIcon type='primary' />
      </div>
      {
        (isOrderActive)
          ? (<Button htmlType='button' type='primary' size='large'
            onClick={() => { handleOpenModal(); setPopupContent(<OrderDetails orderId='034536' />); }}>
            Оформить заказ</Button>)
          : (<Button disabled htmlType='button' type='primary' size='large'>Оформить заказ</Button>)
      }
    </div>
  )
};

OrderingBlock.propTypes = {
  totalPrice: PropTypes.number.isRequired
};


const BurgerConstructor = () => {

  const { ingredientsData, selectedIngredients, setSelectedIngredients, selectedBun, setSelectedBun } = useContext(IngredientsContext);

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
        image: transparentPicturePath,
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
      // имитируем добавление ингридиентов
      addIngredient(ingredientsData.fillings[1]);
      addIngredient(ingredientsData.fillings[0]);
      addIngredient(ingredientsData.sauces[2]);
      addIngredient(ingredientsData.fillings[3]);
      addIngredient(ingredientsData.sauces[1]);
      addBun(ingredientsData.buns[0]);
      return () => {
        effectRun.current = true
      }
    }
  }, []);
  /* Удаление ингредиентов реализовано через иконку на элементе*/
  /* Как удалять булку, мне пока не понятно. Временно сделал кнопку для проверки (кнопка закоментирована). */

  // Проверка для активировации/дезактивации кнопки заказа.
  const isOrderActive = () => {
    if (!totalPrice.count || totalPrice.count <= 0 || !selectedIngredients[0] || !selectedBun._id) {
      return false
    }
    return true
  };

  return (
    <section className={burgerConstructorStyles.section}>
      {/* <button onClick={() => removeBun(selectedBun.price)}>Удалить булку</button> */}
      <ItemsList bun={selectedBun} ingredients={selectedIngredients} removeIngredient={removeIngredient} />
      <OrderingBlock totalPrice={totalPrice.count} isOrderActive={isOrderActive()} />
    </section>
  );
};

export default BurgerConstructor;