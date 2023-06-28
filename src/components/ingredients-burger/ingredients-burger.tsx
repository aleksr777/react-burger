import styles from './ingredients-burger.module.css'
import { useMemo } from 'react'
import { useAppSelector } from '../../hooks/useAppSelector'
import IngredientsBlock from '../ingredients-block/ingredients-block'
import IngredientsItem from '../ingredients-item/ingredients-item'
import TabElement from '../tab-element/tab-element'
import { getIngredientsDataState, getCounterState } from '../../utils/selectors'
import { IngredientInfoType } from '../../types/types'


const IngredientsBurger = () => {

  const { ingredientsData } = useAppSelector( getIngredientsDataState )
  const { counter } = useAppSelector( getCounterState )

  /* Добавляем информацию о react-компоненте (нужно для функционала DnD) */
  function addLocationInfo ( data: IngredientInfoType[] ): IngredientInfoType[] {
    const arr = [ ...data ]
    for ( let i = 0; i < arr.length; i += 1 ) {
      arr[ i ] = { ...arr[ i ], locationDnd: 'IngredientsBurger' }
    }
    return arr
  }

  const [ fillings, sauces, buns ] = useMemo( () => {
    const data = addLocationInfo( ingredientsData )
    const fillings = data.filter( ( obj ) => obj.type === 'main' )
    const sauces = data.filter( ( obj ) => obj.type === 'sauce' )
    const buns = data.filter( ( obj ) => obj.type === 'bun' )
    return [ fillings, sauces, buns ]
  }, [ ingredientsData ] )

  return (
    <>
      <section className={ styles.section }>

        <h2 className={ styles.section__title }>Соберите бургер</h2>

        <div className={ styles.tab }>
          <TabElement ingredientText="buns">Булки</TabElement>
          <TabElement ingredientText="sauces">Соусы</TabElement>
          <TabElement ingredientText="fillings">Начинки</TabElement>
        </div>

        <div className={ styles.section__blocks } id="section-blocks">

          <IngredientsBlock title="Булки" type='buns' >
            { buns.map( ( obj ) => (
              <IngredientsItem
                key={ obj._id }
                ingredient={ obj }
                count={ counter[ obj._id ] }
              />
            ) ) }
          </IngredientsBlock>

          <IngredientsBlock title="Соусы" type='sauces'>
            { sauces.map( ( obj ) => (
              <IngredientsItem
                key={ obj._id }
                ingredient={ obj }
                count={ counter[ obj._id ] }
              />
            ) ) }
          </IngredientsBlock>

          <IngredientsBlock title="Начинки" type='fillings'>
            { fillings.map( ( obj ) => (
              <IngredientsItem
                key={ obj._id }
                ingredient={ obj }
                count={ counter[ obj._id ] }
              />
            ) ) }
          </IngredientsBlock>

        </div>
      </section>
    </>
  )
}

export default IngredientsBurger
