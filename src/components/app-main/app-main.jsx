import React from 'react';
import PropTypes from 'prop-types';
import mainStyles from './app-main.module.css';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';

export const AppMain = props => {
  if (props.ingredientsData.fillings[0] && props.ingredientsData.sauces[0] && props.ingredientsData.buns[0]) {
    return (
      <main className={mainStyles.main}>
        <BurgerIngredients
          ingredientsData={props.ingredientsData}
          handleOpenModal={props.handleOpenModal}
          fillPopupContent={props.fillPopupContent} />
        <BurgerConstructor
          ingredientsData={props.ingredientsData}
          handleOpenModal={props.handleOpenModal}
          fillPopupContent={props.fillPopupContent}
        />
      </main>
    );
  };
};

AppMain.propTypes = {
  ingredientsData: PropTypes.shape({
    fillings: PropTypes.array.isRequired,
    sauces: PropTypes.array.isRequired,
    buns: PropTypes.array.isRequired
  }).isRequired
};