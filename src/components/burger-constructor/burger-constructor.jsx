import React from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './burger-constructor.module.css';
import { data } from '../../utils/data.js';
import {
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';

const Item = props => {
  return (
    <li className={burgerConstructorStyles.item_scroll}>
      <DragIcon type="primary" />
      <ConstructorElement text={props.text} price={props.price} thumbnail={props.thumbnail} />
    </li>
  )
};

Item.propTypes = {
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

const ScrollList = props => {
  return (
    <ul className={burgerConstructorStyles.list_scroll}>
      {props.ingredients.sauces.map((obj) => (
        <Item text={obj.name} price={obj.price} thumbnail={obj.image} key={obj._id} />
      ))}
      {props.ingredients.fillings.map((obj) => (
        <Item text={obj.name} price={obj.price} thumbnail={obj.image} key={obj._id} />
      ))}
    </ul>
  )
};

const ItemsList = props => {
  return (
    <ul className={burgerConstructorStyles.list}>
      <li className={burgerConstructorStyles.item}>
        <ConstructorElement isLocked={true} type="top" text={props.ingredients.buns[0].name + ' (верх)'} price={props.ingredients.buns[0].price} thumbnail={props.ingredients.buns[0].image} />
      </li>
      <li>
        <ScrollList ingredients={props.ingredients} />
      </li>
      <li className={burgerConstructorStyles.item}>
        <ConstructorElement isLocked={true} type="bottom" text={props.ingredients.buns[1].name + ' (низ)'} price={props.ingredients.buns[1].price} thumbnail={props.ingredients.buns[1].image} />
      </li>
    </ul>
  )
};

ItemsList.propTypes = {
  ingredients: PropTypes.object.isRequired
};

const OrderingBlock = props => {
  return (
    <div className={burgerConstructorStyles.order}>
      <div className={burgerConstructorStyles.order__box}>
        <p className={burgerConstructorStyles.order__price}>{props.totalPrice}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
    </div>
  )
};

OrderingBlock.propTypes = {
  totalPrice: PropTypes.number.isRequired
};

export const BurgerConstructor = () => {

  const selectedFillings = [data[4], data[7], data[8], data[10], data[11], data[12]];
  const selectedSauces = [data[5], data[9]];
  const selectedBuns = [data[0], data[0]];

  const [ingredients, setIngredients] = React.useState({
    fillings: selectedFillings,
    sauces: selectedSauces,
    buns: selectedBuns
  });

  return (
    <section className={burgerConstructorStyles.section}>
      <ItemsList ingredients={ingredients} />
      <OrderingBlock totalPrice={6100} />
    </section>
  );
};