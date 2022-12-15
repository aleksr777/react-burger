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

const Item = props => {
  return (
    <li className={burgerConstructorStyles.item_scroll}    >
      <DragIcon type='primary' />
      <ConstructorElement text={props.text} price={props.price} thumbnail={props.thumbnail} />
    </li>
  )
};

/* Item.propTypes = {
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}; */

const ScrollList = props => {
  return (
    <ul className={burgerConstructorStyles.list_scroll}>
      {props.sauces.map((obj) => (
        <Item
          text={obj.name}
          price={obj.price}
          thumbnail={obj.image}
          key={obj._id}
        />
      ))}
      {props.fillings.map((obj) => (
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

const OrderingBlock = props => {
  return (
    <div className={burgerConstructorStyles.order}>
      <div className={burgerConstructorStyles.order__box}>
        <p className={burgerConstructorStyles.order__price}>{props.totalPrice}</p>
        <CurrencyIcon type='primary' />
      </div>
      <Button
        htmlType='button'
        type='primary'
        size='large'
        onClick={() => { props.handleOpenModal(); props.fillPopupContent(<OrderDetails orderId='034536' />); }}
      >Оформить заказ</Button>
    </div>
  )
};

OrderingBlock.propTypes = {
  totalPrice: PropTypes.number.isRequired
};

export const BurgerConstructor = props => {

  //Выбранные пользователем ингридиенты (пока только условно для отображения вёрстки)
  const selectedFillings = [
    props.ingredientsData.fillings[0],
    props.ingredientsData.fillings[1],
    props.ingredientsData.fillings[2],
    props.ingredientsData.fillings[3],
    props.ingredientsData.fillings[4]
  ];
  const selectedSauces = [
    props.ingredientsData.sauces[0],
    props.ingredientsData.sauces[1],
    props.ingredientsData.sauces[2]
  ];
  const selectedBun = props.ingredientsData.buns[0];

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
      <OrderingBlock totalPrice={countTotalPrice()} handleOpenModal={props.handleOpenModal} fillPopupContent={props.fillPopupContent} />
    </section>
  );
};

/* BurgerConstructor.propTypes = {
  ingredientsData: PropTypes.object.isRequired
}; */