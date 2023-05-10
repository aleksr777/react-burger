import { useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ConstructorBurger from '../../components/constructor-burger/constructor-burger';
import IngredientsBurger from '../../components/ingredients-burger/ingredients-burger';
import { getIngredientsDataState } from '../../utils/selectors';


const HomePage = () => {

  const { isLoading, ingredientsData } = useSelector(getIngredientsDataState);

  return (
    !isLoading &&
    ingredientsData.length &&
    (<DndProvider backend={HTML5Backend}>
      <IngredientsBurger />
      <ConstructorBurger />
    </DndProvider>)
  )
};

export default HomePage;