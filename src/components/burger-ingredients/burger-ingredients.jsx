import { useContext, useMemo } from "react";
import burgerIngredientsStyles from './burger-ingredients.module.css';
import TabBlockIngredients from '../tab-block-ingredients/tab-block-ingredients';
import BlockIngredients from '../block-ingredients/block-ingredients';
import ItemIngredients from '../item-ingredients/item-ingredients';
import { IngredientsContext } from '../../context/ingredients-context';

const BurgerIngredients = () => {

  const { ingredientsData } = useContext(IngredientsContext);

  const fillings = useMemo(() => ingredientsData.filter((obj) => obj.type === 'main'), [ingredientsData]);
  const sauces = useMemo(() => ingredientsData.filter((obj) => obj.type === 'sauce'), [ingredientsData]);
  const buns = useMemo(() => ingredientsData.filter((obj) => obj.type === 'bun'), [ingredientsData]);

  return (
    <section className={burgerIngredientsStyles.section}>

      <h2 className={burgerIngredientsStyles.section__title}>Соберите бургер</h2>

      <TabBlockIngredients />

      <div className={burgerIngredientsStyles.section__blocks} id='section-blocks'>

        <BlockIngredients blockTitle='Булки' name='buns'>
          {buns.map((obj) => (
            <ItemIngredients
              itemPrice={obj.price}
              itemTitle={obj.name}
              imgPath={obj.image}
              key={obj._id}
              ingredient={obj}
            >
            </ItemIngredients>
          ))}
        </BlockIngredients>

        <BlockIngredients blockTitle='Соусы' name='sauces'>
          {sauces.map((obj) => (
            <ItemIngredients
              itemPrice={obj.price}
              itemTitle={obj.name}
              imgPath={obj.image}
              key={obj._id}
              ingredient={obj}
            >
            </ItemIngredients>
          ))}
        </BlockIngredients>

        <BlockIngredients blockTitle='Начинки' name='fillings'>
          {fillings.map((obj) => (
            <ItemIngredients
              itemPrice={obj.price}
              itemTitle={obj.name}
              imgPath={obj.image}
              key={obj._id}
              ingredient={obj}
            >
            </ItemIngredients>
          ))}
        </BlockIngredients>
      </div>
    </section>
  );
};

export default BurgerIngredients;