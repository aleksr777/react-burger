import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GET_DATA_INGREDIENTS_REQUEST } from '../../services/ingredients-data/ingredients-data-actions';
import Preloader from '../../components/preloader/preloader';
import AppPage from '../../components/app-page/app-page';
import AppHeader from '../../components/app-header/app-header';
import AppMainBlock from '../../components/app-main/app-main';

const getIngredientsDataState = state => state.ingredientsData;

const HomePage = () => {

  const dispatch = useDispatch();

  const { loadingState } = useSelector(getIngredientsDataState);

  function startLoading() {
    dispatch({ type: GET_DATA_INGREDIENTS_REQUEST, payload: {} })
  }

  useEffect(() => { startLoading() }, []);

  return (

    <AppPage>

      <AppHeader />

      <AppMainBlock>

        {loadingState
          ? <Preloader />
          : (
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          )}

      </AppMainBlock>

    </AppPage>
  )
};

export default HomePage;