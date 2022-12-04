import React from 'react';
import mainStyles from './app-main.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

export default class AppMain extends React.Component {
  render() {
    return (
      <main className={mainStyles.main}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    );
  }
};