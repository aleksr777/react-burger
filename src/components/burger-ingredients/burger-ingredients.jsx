import { useEffect, useMemo, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients-data-actions';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import TabBlockIngredients from '../tab-block-ingredients/tab-block-ingredients';
import BlockIngredients from '../block-ingredients/block-ingredients';
import ItemIngredients from '../item-ingredients/item-ingredients';
import ModalIngredientDetails from '../modal-ingredient-details/modal-ingredient-details';
import BlockSelectingIngredients from '../block-selecting-ingredients/block-selecting-ingredients';

const BurgerIngredients = () => {

  const dispatch = useDispatch();

  const { ingredientsData } = useSelector(state => state.ingredientsData);

  useEffect(() => { dispatch(getIngredients()) }, [dispatch]);

  const fillings = useMemo(() => ingredientsData.filter((obj) => obj.type === 'main'), [ingredientsData]);
  const sauces = useMemo(() => ingredientsData.filter((obj) => obj.type === 'sauce'), [ingredientsData]);
  const buns = useMemo(() => ingredientsData.filter((obj) => obj.type === 'bun'), [ingredientsData]);

  return (
    <>

      <section className={burgerIngredientsStyles.section}>

        {/* компонент для проверки функционала (потом удалю) */}
        <BlockSelectingIngredients />

        <h2 className={burgerIngredientsStyles.section__title}>Соберите бургер</h2>

        <TabBlockIngredients />

        <div className={burgerIngredientsStyles.section__blocks} id='section-blocks'>

          <BlockIngredients blockTitle='Булки' name='buns'>
            {buns.map((obj) => (
              <ItemIngredients
                key={obj._id}
                ingredient={obj}
              >
              </ItemIngredients>
            ))}
          </BlockIngredients>

          <BlockIngredients blockTitle='Соусы' name='sauces'>
            {sauces.map((obj) => (
              <ItemIngredients
                key={obj._id}
                ingredient={obj}
              >
              </ItemIngredients>
            ))}
          </BlockIngredients>

          <BlockIngredients blockTitle='Начинки' name='fillings'>
            {fillings.map((obj) => (
              <ItemIngredients
                key={obj._id}
                ingredient={obj}
              >
              </ItemIngredients>
            ))}
          </BlockIngredients>
        </div>
      </section>

      <ModalIngredientDetails />

    </>
  );
};

export default BurgerIngredients;