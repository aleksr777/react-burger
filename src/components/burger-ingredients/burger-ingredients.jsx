import { useEffect, useMemo, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from '../../services/ingredients-data/ingredients-data-actions';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import TabBlockIngredients from '../tab-block-ingredients/tab-block-ingredients';
import BlockIngredients from '../block-ingredients/block-ingredients';
import ItemIngredients from '../item-ingredients/item-ingredients';
import ModalIngredientDetails from '../modal-ingredient-details/modal-ingredient-details';
import CounterItem from '../counter-item/counter-item';


const getIngredientsDataState = state => state.ingredientsData;

const BurgerIngredients = () => {

  const dispatch = useDispatch();

  const { ingredientsData } = useSelector(getIngredientsDataState);

  useEffect(() => { dispatch(getIngredients()) }, [dispatch]);

  /* Добавляем информацию о react-компоненте (нужно для функционала DnD) */
  function addLocationInfo(data) {
    const arr = [...data];
    for (let i = 0; i < arr.length; i += 1) {
      arr[i] = { ...arr[i], component: 'BurgerIngredients' };
    };
    return arr
  };

  const data = useMemo(() => addLocationInfo(ingredientsData), [ingredientsData]);
  const fillings = useMemo(() => data.filter((obj) => obj.type === 'main'), [data]);
  const sauces = useMemo(() => data.filter((obj) => obj.type === 'sauce'), [data]);
  const buns = useMemo(() => data.filter((obj) => obj.type === 'bun'), [data]);

  return (
    <>
      <section className={burgerIngredientsStyles.section}>

        <h2 className={burgerIngredientsStyles.section__title}>Соберите бургер</h2>

        <TabBlockIngredients />

        <div className={burgerIngredientsStyles.section__blocks} id='section-blocks'>

          <BlockIngredients blockTitle='Булки' name='buns'>
            {buns.map((obj) => (
              <ItemIngredients
                key={obj._id}
                ingredient={obj}
              >
                <CounterItem obj={obj} />
              </ItemIngredients>
            ))}
          </BlockIngredients>

          <BlockIngredients blockTitle='Соусы' name='sauces'>
            {sauces.map((obj) => (
              <ItemIngredients
                key={obj._id}
                ingredient={obj}
              >
                <CounterItem obj={obj} />
              </ItemIngredients>
            ))}
          </BlockIngredients>

          <BlockIngredients blockTitle='Начинки' name='fillings'>
            {fillings.map((obj) => (
              <ItemIngredients
                key={obj._id}
                ingredient={obj}
              >
                <CounterItem obj={obj} />
              </ItemIngredients>
            ))}
          </BlockIngredients>
        </div>
      </section>

      <ModalIngredientDetails />

    </>
  );
};

export default memo(BurgerIngredients);