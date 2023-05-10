import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredientsData } from '../../services/ingredients-data/ingredients-data-actions';
import Loader from '../../components/loader/loader';
import ConstructorBurger from '../../components/constructor-burger/constructor-burger';
import IngredientsBurger from '../../components/ingredients-burger/ingredients-burger';

const getIngredientsDataState = state => state.ingredientsData;


const HomePage = () => {

  const { isLoading, isError } = useSelector(getIngredientsDataState);

  const dispatch = useDispatch();

  useEffect(() => { dispatch(getIngredientsData()) }, []);

  return (
    !isLoading &&
    <>
      <Loader size={100} isLoading={isLoading} isError={isError} />
      <DndProvider backend={HTML5Backend}>
        <IngredientsBurger />
        <ConstructorBurger />
      </DndProvider>
    </>
  )
};

export default HomePage;