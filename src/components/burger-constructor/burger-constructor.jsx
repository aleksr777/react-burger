import React from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './burger-constructor.module.css';
import OrderDetails from '../order-details/order-details';
import {
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';

const Item = ({ text, price, thumbnail }) => {
  return (
    <li className={burgerConstructorStyles.item_scroll}    >
      <DragIcon type='primary' />
      <ConstructorElement text={text} price={price} thumbnail={thumbnail} />
    </li>
  )
};

/* Item.propTypes = {
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}; */

const ScrollList = ({ sauces, fillings }) => {
  return (
    <ul className={burgerConstructorStyles.list_scroll}>
      {sauces.map((obj) => (
        <Item
          text={obj.name}
          price={obj.price}
          thumbnail={obj.image}
          key={obj._id}
        />
      ))}
      {fillings.map((obj) => (
        <Item
          text={obj.name}
          price={obj.price}
          thumbnail={obj.image}
          key={obj._id}
        />
      ))}
    </ul>
  )
};

/* ScrollList.propTypes = {
  sauces: PropTypes.array.isRequired,
  fillings: PropTypes.array.isRequired
}; */

const BunElement = ({ bun, type, positionText }) => {
  return (
    <ConstructorElement
      isLocked={true}
      type={type}
      text={`${bun.name} ${positionText}`}
      price={bun.price}
      thumbnail={bun.image}
    />
  )
};

const ItemsList = ({ bun, fillings, sauces }) => {
  return (
    <ul className={burgerConstructorStyles.list}>

      <li className={burgerConstructorStyles.item}>
        <BunElement bun={bun} type='top' positionText='(верх)' />
      </li>

      <li>
        <ScrollList fillings={fillings} sauces={sauces} />
      </li>

      <li className={burgerConstructorStyles.item}>
        <BunElement bun={bun} type='bottom' positionText='(низ)' />
      </li>

    </ul>
  )
};

/* ItemsList.propTypes = {
  buns: PropTypes.array.isRequired,
  fillings: PropTypes.array.isRequired,
  sauces: PropTypes.array.isRequired
}; */

const OrderingBlock = ({ totalPrice, handleOpenModal, fillPopupContent }) => {
  return (
    <div className={burgerConstructorStyles.order}>
      <div className={burgerConstructorStyles.order__box}>
        <p className={burgerConstructorStyles.order__price}>{totalPrice}</p>
        <CurrencyIcon type='primary' />
      </div>
      <Button
        htmlType='button'
        type='primary'
        size='large'
        onClick={() => { handleOpenModal(); fillPopupContent(<OrderDetails orderId='034536' />); }}
      >Оформить заказ</Button>
    </div>
  )
};

OrderingBlock.propTypes = {
  totalPrice: PropTypes.number.isRequired
};

export const BurgerConstructor = ({ ingredientsData, handleOpenModal, fillPopupContent }) => {

  //Выбранные пользователем ингридиенты (пока только условно для отображения вёрстки)
  const selectedFillings = [
    ingredientsData.fillings[0],
    ingredientsData.fillings[1],
    ingredientsData.fillings[2],
    ingredientsData.fillings[3],
    ingredientsData.fillings[4]
  ];
  const selectedSauces = [
    ingredientsData.sauces[0],
    ingredientsData.sauces[1],
    ingredientsData.sauces[2]
  ];
  const selectedBun = ingredientsData.buns[0];

  const countTotalPrice = () => {
    let price = 0;
    [...selectedFillings, ...selectedSauces].map((obj) => {
      price = price + obj.price;
    });
    return price + selectedBun.price * 2;
  }

  return (
    <section className={burgerConstructorStyles.section}>
      <ItemsList bun={selectedBun} fillings={selectedFillings} sauces={selectedSauces} />
      <OrderingBlock totalPrice={countTotalPrice()} handleOpenModal={handleOpenModal} fillPopupContent={fillPopupContent} />
    </section>
  );
};

/* BurgerConstructor.propTypes = {
  ingredientsData: PropTypes.object.isRequired
}; */