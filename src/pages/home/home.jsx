import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredientsData } from '../../services/ingredients-data/ingredients-data-actions';
import Loader from '../../components/loader/loader';
import AppPage from '../../components/app-page/app-page';
import AppHeader from '../../components/app-header/app-header';
import AppMainBlock from '../../components/app-main/app-main';
import ConstructorBurger from '../../components/constructor-burger/constructor-burger';
import IngredientsBurger from '../../components/ingredients-burger/ingredients-burger';


const getIngredientsDataState = state => state.ingredientsData;


const HomePage = () => {

  const { isLoading, isError, errorMessage } = useSelector(getIngredientsDataState);

  const dispatch = useDispatch();

  useEffect(() => { dispatch(getIngredientsData()) }, []);

  return (

    <AppPage>

      <AppHeader />

      <Loader
        size={100}
        isLoading={isLoading}
        isError={isError}
        errorMessage={errorMessage}
      />

      {
        !isLoading
          ? (
            <AppMainBlock>
              <DndProvider backend={HTML5Backend}>
                <IngredientsBurger />
                <ConstructorBurger />
              </DndProvider>
            </AppMainBlock>
          )
          : null
      }

    </AppPage>
  )
};

export default HomePage;