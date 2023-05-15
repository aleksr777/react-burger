import stylesIngredientsBurger from './ingredients-burger.module.css';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import IngredientsBlock from '../ingredients-block/ingredients-block';
import IngredientsItem from '../ingredients-item/ingredients-item';
import CounterItem from '../counter-item/counter-item';
import TabElement from '../tab-element/tab-element';
import { getIngredientsDataState } from '../../utils/selectors';


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

  const [fillings, sauces, buns] = useMemo(() => {
    const data = addLocationInfo(ingredientsData);
    const fillings = data.filter((obj) => obj.type === 'main');
    const sauces = data.filter((obj) => obj.type === 'sauce');
    const buns = data.filter((obj) => obj.type === 'bun');
    return [fillings, sauces, buns];
  }, [ingredientsData]);

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

export default IngredientsBurger;