import { useContext } from "react";
import burgerIngredientsStyles from './burger-ingredients.module.css';
import TabBlockIngredients from '../tab-block-ingredients/tab-block-ingredients';
import BlockIngredients from '../block-ingredients/block-ingredients';
import ItemIngredients from '../item-ingredients/item-ingredients';
import { IngredientsContext } from '../../context/ingredients-context';

const BurgerIngredients = () => {

  const { ingredientsData } = useContext(IngredientsContext);

  return (
    <section className={burgerIngredientsStyles.section}>

      <h2 className={burgerIngredientsStyles.section__title}>Соберите бургер</h2>

      <TabBlockIngredients />

      <div className={burgerIngredientsStyles.section__blocks}>

        <BlockIngredients blockTitle='Булки'>
          {ingredientsData.buns.map((obj) => (
            <ItemIngredients
              itemPrice={obj.price}
              itemTitle={obj.name}
              imgPath={obj.image}
              key={obj._id}
              ingridient={obj}
            >
            </ItemIngredients>
          ))}
        </BlockIngredients>

        <BlockIngredients blockTitle='Соусы'>
          {ingredientsData.sauces.map((obj) => (
            <ItemIngredients
              itemPrice={obj.price}
              itemTitle={obj.name}
              imgPath={obj.image}
              key={obj._id}
              ingridient={obj}
            >
            </ItemIngredients>
          ))}
        </BlockIngredients>

        <BlockIngredients blockTitle='Начинки'>
          {ingredientsData.fillings.map((obj) => (
            <ItemIngredients
              itemPrice={obj.price}
              itemTitle={obj.name}
              imgPath={obj.image}
              key={obj._id}
              ingridient={obj}
            >
            </ItemIngredients>
          ))}
        </BlockIngredients>
      </div>
    </section>
  );
};

export default BurgerIngredients;