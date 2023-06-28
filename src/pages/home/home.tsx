import { useAppSelector } from '../../hooks/useAppSelector'
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import ConstructorBurger from '../../components/constructor-burger/constructor-burger'
import IngredientsBurger from '../../components/ingredients-burger/ingredients-burger'
import { getIngredientsDataState } from '../../utils/selectors'
import { IngredientsDataStateType } from '../../types/types'


const HomePage = () => {

  const { isLoading, ingredientsData }: IngredientsDataStateType = useAppSelector( getIngredientsDataState )

  return (
    <>
      { !isLoading &&
        ingredientsData.length &&
        ( <DndProvider backend={ HTML5Backend }>
          <IngredientsBurger />
          <ConstructorBurger />
        </DndProvider> ) }
    </>
  )
}

export default HomePage