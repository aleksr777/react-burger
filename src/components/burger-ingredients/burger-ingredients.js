import React from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { data } from '../../utils/data.js';
import {
  Tab,
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';

const TabBlock = () => {
  const [current, setCurrent] = React.useState('one')
  return (
    <div style={{ display: 'flex' }} className={burgerIngredientsStyles.tab}>
      <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="fillings" active={current === 'fillings'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  )
};

const IngredientBlock = props => {
  return (
    <div className={burgerIngredientsStyles.block}>
      <h3 className={burgerIngredientsStyles.block__title}>{props.blockTitle}</h3>
      <ul className={burgerIngredientsStyles.block__list}>
        {props.children}
      </ul>
    </div>
  )
};

IngredientBlock.propTypes = {
  blockTitle: PropTypes.string
}; 

const IngredientItem = props => {
  return (
    <li className={burgerIngredientsStyles.item}>
      {props.children}
      <img className={burgerIngredientsStyles.item__image} src={props.imgPath} alt={props.itemTitle} />
      <div className={burgerIngredientsStyles.item__box}>
        <p className={burgerIngredientsStyles.item__price}>{props.itemPrice}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={burgerIngredientsStyles.item__title}>{props.itemTitle}</p>
    </li>
  )
};

IngredientItem.propTypes = {
  itemPrice: PropTypes.number,
  imgPath: PropTypes.string,
  itemTitle: PropTypes.string
}; 

export default class BurgerIngredients extends React.Component {
  render() {
    return (
      <section className={burgerIngredientsStyles.section}>

        <h2 className={burgerIngredientsStyles.section__title}>Соберите бургер</h2>

        <TabBlock />

        <div className={burgerIngredientsStyles.section__blocks}>

          <IngredientBlock blockTitle="Булки">
            <IngredientItem itemPrice={data[0].price} itemTitle={data[0].name} imgPath={data[0].image}>
              <Counter count={1} size="default" extraClass="m-1" />
            </IngredientItem>
            <IngredientItem itemPrice={data[14].price} itemTitle={data[14].name} imgPath={data[14].image}>
            </IngredientItem>
          </IngredientBlock>

          <IngredientBlock blockTitle="Соусы">
            <IngredientItem itemPrice={data[3].price} itemTitle={data[3].name} imgPath={data[3].image}>
            </IngredientItem>
            <IngredientItem itemPrice={data[6].price} itemTitle={data[6].name} imgPath={data[6].image}>
            </IngredientItem>
            <IngredientItem itemPrice={data[5].price} itemTitle={data[5].name} imgPath={data[5].image}>
              <Counter count={1} size="default" extraClass="m-1" />
            </IngredientItem>
            <IngredientItem itemPrice={data[9].price} itemTitle={data[9].name} imgPath={data[9].image}>
            </IngredientItem>
          </IngredientBlock>

        </div>
      </section>
    );
  }
};