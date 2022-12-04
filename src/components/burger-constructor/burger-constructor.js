import React from 'react';
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

const ScrollList = () => {
  return (
    <ul className={burgerConstructorStyles.list_scroll}>
      <Item text={data[5].name} price={data[5].price} thumbnail={data[5].image} />
      <Item text={data[4].name} price={data[4].price} thumbnail={data[4].image} />
      <Item text={data[7].name} price={data[7].price} thumbnail={data[7].image} />
      <Item text={data[8].name} price={data[8].price} thumbnail={data[8].image} />
      <Item text={data[9].name} price={data[9].price} thumbnail={data[9].image} />
      <Item text={data[10].name} price={data[10].price} thumbnail={data[10].image} />
      <Item text={data[11].name} price={data[11].price} thumbnail={data[11].image} />
      <Item text={data[12].name} price={data[12].price} thumbnail={data[12].image} />
    </ul>
  )
};

const ItemsList = () => {
  return (
    <ul className={burgerConstructorStyles.list}>
      <li className={burgerConstructorStyles.item}>
        <ConstructorElement isLocked={true} type="top" text={data[0].name + ' (верх)'} price={data[0].price} thumbnail={data[0].image} />
      </li>
      <li>
        <ScrollList />
      </li>
      <li className={burgerConstructorStyles.item}>
        <ConstructorElement isLocked={true} type="bottom" text={data[0].name + ' (низ)'} price={data[0].price} thumbnail={data[0].image} />
      </li>
    </ul>
  )
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

export default class BurgerConstructor extends React.Component {
  render() {
    return (
      <section className={burgerConstructorStyles.section}>
        <ItemsList />
        <OrderingBlock totalPrice="610" />
      </section>
    );
  }
};