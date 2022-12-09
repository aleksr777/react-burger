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
      {props.selectedIngredients.map((obj) => (
        <Item text={obj.name} price={obj.price} thumbnail={obj.image} key={obj._id} />
      ))}
    </ul>
  )
};

const ItemsList = props => {
  return (
    <ul className={burgerConstructorStyles.list}>
      <li className={burgerConstructorStyles.item}>
        <ConstructorElement isLocked={true} type="top" text={props.selectedBuns[0].name + ' (верх)'} price={props.selectedBuns[0].price} thumbnail={props.selectedBuns[0].image} />
      </li>
      <li>
        <ScrollList selectedIngredients={props.selectedIngredients}/>
      </li>
      <li className={burgerConstructorStyles.item}>
        <ConstructorElement isLocked={true} type="bottom" text={props.selectedBuns[1].name + ' (низ)'} price={props.selectedBuns[1].price} thumbnail={props.selectedBuns[1].image} />
      </li>
    </ul>
  )
};

ItemsList.propTypes = {
  selectedIngredients: PropTypes.array.isRequired
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

export default class BurgerConstructor extends React.Component {
  constructor(props) {
    super(props);
    // Выбранные пользователем ингредиенты
    this.selectedIngredients = [data[5], data[4], data[7], data[8], data[9], data[10], data[11], data[12]];
    this.selectedBuns = [data[0], data[0]];
    this.state = {
      selectedIngredients: this.selectedIngredients,
      selectedBuns: this.selectedBuns
    };
  }

  render() {
    return (
      <section className={burgerConstructorStyles.section}>
        <ItemsList selectedIngredients={this.state.selectedIngredients} selectedBuns={this.state.selectedBuns} />
        <OrderingBlock totalPrice={610} />
      </section>
    );
  };
};