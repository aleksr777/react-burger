import { useState, useContext } from "react";
import PropTypes from 'prop-types';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import IngredientDetails from '../ingredient-details/ingredient-details';
import {
  Tab,
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsContext } from '../../context/ingredients-context';
import { PopupContext } from '../../context/popup-context';

const TabBlock = () => {
  const [current, setCurrent] = useState('one')
  return (
    <div className={burgerIngredientsStyles.tab}>
      <Tab value='buns' active={current === 'buns'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value='sauces' active={current === 'sauces'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value='fillings' active={current === 'fillings'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  )
};

const IngredientBlock = ({ children, blockTitle }) => {
  return (
    <div className={burgerIngredientsStyles.block}>
      <h3 className={burgerIngredientsStyles.block__title}>{blockTitle}</h3>
      <ul className={burgerIngredientsStyles.block__list}>
        {children}
      </ul>
    </div>
  )
};

IngredientBlock.propTypes = {
  blockTitle: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

const IngredientItem = ({ children, itemPrice, itemTitle, imgPath, ingridient }) => {
  const { handleOpenModal, setPopupContent } = useContext(PopupContext);
  return (
    <li
      className={burgerIngredientsStyles.item}
      onClick={() => {
        handleOpenModal();
        setPopupContent(<IngredientDetails ingridient={ingridient} />);
      }}
    >
      {children}
      <img
        className={burgerIngredientsStyles.item__image}
        src={imgPath}
        alt={itemTitle}
      />
      <div className={burgerIngredientsStyles.item__box}>
        <p className={burgerIngredientsStyles.item__price}>{itemPrice}</p>
        <CurrencyIcon type='primary' />
      </div>
      <p className={burgerIngredientsStyles.item__title}>{itemTitle}</p>
    </li>
  )
};

IngredientItem.propTypes = {
  itemPrice: PropTypes.number.isRequired,
  imgPath: PropTypes.string.isRequired,
  itemTitle: PropTypes.string.isRequired
};

export const BurgerIngredients = () => {
  const { ingredientsData } = useContext(IngredientsContext);
  return (
    <section className={burgerIngredientsStyles.section}>

      <h2 className={burgerIngredientsStyles.section__title}>Соберите бургер</h2>

      <TabBlock />

      <div className={burgerIngredientsStyles.section__blocks}>

        <IngredientBlock blockTitle='Булки'>
          {ingredientsData.buns.map((obj) => (
            <IngredientItem
              itemPrice={obj.price}
              itemTitle={obj.name}
              imgPath={obj.image}
              key={obj._id}
              ingridient={obj}
            >
            </IngredientItem>
          ))}
        </IngredientBlock>

        <IngredientBlock blockTitle='Соусы'>
          {ingredientsData.sauces.map((obj) => (
            <IngredientItem
              itemPrice={obj.price}
              itemTitle={obj.name}
              imgPath={obj.image}
              key={obj._id}
              ingridient={obj}
            >
            </IngredientItem>
          ))}
        </IngredientBlock>

        <IngredientBlock blockTitle='Начинки'>
          {ingredientsData.fillings.map((obj) => (
            <IngredientItem
              itemPrice={obj.price}
              itemTitle={obj.name}
              imgPath={obj.image}
              key={obj._id}
              ingridient={obj}
            >
            </IngredientItem>
          ))}
        </IngredientBlock>
      </div>
    </section>
  );
};