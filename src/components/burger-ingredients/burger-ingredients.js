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
    <div className={burgerIngredientsStyles.tab}>
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
  blockTitle: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
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
  itemPrice: PropTypes.number.isRequired,
  imgPath: PropTypes.string.isRequired,
  itemTitle: PropTypes.string.isRequired
};

export default class BurgerIngredients extends React.Component {
  constructor(props) {
    super(props);
    this.ingredientsData = [];
    this.saucesData = [];
    this.bunsData = [];
    data.map((obj) => {
      if (obj.type === 'main') { this.ingredientsData.push(obj) }
      else if (obj.type === 'sauce') { this.saucesData.push(obj) }
      else if (obj.type === 'bun') { this.bunsData.push(obj) }
    });
    this.state = {
      ingredientsData: this.ingredientsData,
      saucesData: this.saucesData,
      bunsData: this.bunsData,
    };
  }

  render() {
    return (
      <section className={burgerIngredientsStyles.section}>

        <h2 className={burgerIngredientsStyles.section__title}>Соберите бургер</h2>

        <TabBlock />

        <div className={burgerIngredientsStyles.section__blocks}>

          <IngredientBlock blockTitle="Булки">
            {this.state.bunsData.map((obj) => (
              <IngredientItem itemPrice={obj.price} itemTitle={obj.name} imgPath={obj.image} key={obj._id}>
              </IngredientItem>
            ))}
            
            {/* <Counter count={1} size="default" extraClass="m-1" /> */}

          </IngredientBlock>

          <IngredientBlock blockTitle="Соусы">
            {this.state.saucesData.map((obj) => (
              <IngredientItem itemPrice={obj.price} itemTitle={obj.name} imgPath={obj.image} key={obj._id}>
              </IngredientItem>
            ))}
          </IngredientBlock>

          <IngredientBlock blockTitle="Начинки">
            {this.state.ingredientsData.map((obj) => (
              <IngredientItem itemPrice={obj.price} itemTitle={obj.name} imgPath={obj.image} key={obj._id}>
              </IngredientItem>
            ))}
          </IngredientBlock>
        </div>
      </section>
    );
  };
};