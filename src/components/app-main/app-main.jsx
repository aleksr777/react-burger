import React from 'react';
import PropTypes from 'prop-types';
import mainStyles from './app-main.module.css';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';

export const AppMain = () => {
    return (
      <main className={mainStyles.main}>
        <BurgerIngredients/>
        <BurgerConstructor/>
      </main>
    );
};