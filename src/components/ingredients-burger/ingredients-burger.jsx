import stylesIngredientsBurger from './ingredients-burger.module.css';
import { useMemo, memo } from 'react';
import { useSelector } from 'react-redux';
import IngredientsBlock from '../ingredients-block/ingredients-block';
import IngredientsItem from '../ingredients-item/ingredients-item';
import CounterItem from '../counter-item/counter-item';
import TabElement from '../tab-element/tab-element';


const getIngredientsDataState = state => state.ingredientsData;


const IngredientsBurger = () => {

  const { ingredientsData } = useSelector(getIngredientsDataState);

  /* Добавляем информацию о react-компоненте (нужно для функционала DnD) */
  function addLocationInfo(data) {
    const arr = [...data];
    for (let i = 0; i < arr.length; i += 1) {
      arr[i] = { ...arr[i], locationDnd: 'IngredientsBurger' };
    };
    return arr
  };

  const data = useMemo(() => addLocationInfo(ingredientsData), [ingredientsData]);
  const fillings = useMemo(() => data.filter((obj) => obj.type === 'main'), [data]);
  const sauces = useMemo(() => data.filter((obj) => obj.type === 'sauce'), [data]);
  const buns = useMemo(() => data.filter((obj) => obj.type === 'bun'), [data]);

  return (
    <>
      <section className={stylesIngredientsBurger.section}>

        <h2 className={stylesIngredientsBurger.section__title}>Соберите бургер</h2>

        <div className={stylesIngredientsBurger.tab}>
          <TabElement ingredientText='buns'>Булки</TabElement >
          <TabElement ingredientText='sauces'>Соусы</TabElement >
          <TabElement ingredientText='fillings'>Начинки</TabElement >
        </div>

        <div className={stylesIngredientsBurger.section__blocks} id='section-blocks'>

          <IngredientsBlock blockTitle='Булки' name='buns'>
            {buns.map((obj) => (
              <IngredientsItem
                key={obj._id}
                ingredient={obj}
              >
                <CounterItem obj={obj} />
              </IngredientsItem>
            ))}
          </IngredientsBlock>

          <IngredientsBlock blockTitle='Соусы' name='sauces'>
            {sauces.map((obj) => (
              <IngredientsItem
                key={obj._id}
                ingredient={obj}
              >
                <CounterItem obj={obj} />
              </IngredientsItem>
            ))}
          </IngredientsBlock>

          <IngredientsBlock blockTitle='Начинки' name='fillings'>
            {fillings.map((obj) => (
              <IngredientsItem
                key={obj._id}
                ingredient={obj}
              >
                <CounterItem obj={obj} />
              </IngredientsItem>
            ))}
          </IngredientsBlock>
        </div>
      </section>

    </>
  );
};

export default memo(IngredientsBurger);