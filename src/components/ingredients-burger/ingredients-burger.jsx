import stylesIngredientsBurger from './ingredients-burger.module.css';
import { useEffect, useMemo, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from '../../services/ingredients-data/ingredients-data-actions';
import IngredientsTabBlock from '../ingredients-tab-block/ingredients-tab-block';
import IngredientsBlock from '../ingredients-block/ingredients-block';
import IngredientsItem from '../ingredients-item/ingredients-item';
import ModalIngredientDetails from '../modal-ingredient-details/modal-ingredient-details';
import CounterItem from '../counter-item/counter-item';


const getIngredientsDataState = state => state.ingredientsData;

const IngredientsBurger = () => {

  const dispatch = useDispatch();

  const { ingredientsData } = useSelector(getIngredientsDataState);

  useEffect(() => { dispatch(getIngredients()) }, [dispatch]);

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

        <IngredientsTabBlock />

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

      <ModalIngredientDetails />

    </>
  );
};

export default memo(IngredientsBurger);