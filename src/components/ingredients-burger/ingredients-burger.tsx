import stylesIngredientsBurger from './ingredients-burger.module.css'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import IngredientsBlock from '../ingredients-block/ingredients-block'
import IngredientsItem from '../ingredients-item/ingredients-item'
import TabElement from '../tab-element/tab-element'
import { getIngredientsDataState, getCounterState } from '../../utils/selectors'
import { IngredientObjType, CounterType } from '../../types/types'


const IngredientsBurger = () => {

  const { ingredientsData }: { ingredientsData: IngredientObjType[] } = useSelector( getIngredientsDataState )
  const { counter }: { counter: CounterType } = useSelector( getCounterState )

  /* Добавляем информацию о react-компоненте (нужно для функционала DnD) */
  function addLocationInfo ( data: IngredientObjType[] ): IngredientObjType[] {
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
      <section className={ stylesIngredientsBurger.section }>
        <h2 className={ stylesIngredientsBurger.section__title }>Соберите бургер</h2>
        <div className={ stylesIngredientsBurger.tab }>
          <TabElement ingredientText="buns">Булки</TabElement>
          <TabElement ingredientText="sauces">Соусы</TabElement>
          <TabElement ingredientText="fillings">Начинки</TabElement>
        </div>
        <div className={ stylesIngredientsBurger.section__blocks } id="section-blocks">
          <IngredientsBlock title="Булки">
            { buns.map( ( obj ) => (
              <IngredientsItem
                key={ obj._id }
                ingredient={ obj }
                count={ counter[ obj._id ] }
              />
            ) ) }
          </IngredientsBlock>
          <IngredientsBlock title="Соусы">
            { sauces.map( ( obj ) => (
              <IngredientsItem
                key={ obj._id }
                ingredient={ obj }
                count={ counter[ obj._id ] }
              />
            ) ) }
          </IngredientsBlock>
          <IngredientsBlock title="Начинки">
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
