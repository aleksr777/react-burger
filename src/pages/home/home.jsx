import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GET_DATA_INGREDIENTS_REQUEST } from '../../services/ingredients-data/ingredients-data-actions';
import Loader from '../../components/loader/loader';
import AppPage from '../../components/app-page/app-page';
import AppHeader from '../../components/app-header/app-header';
import AppMainBlock from '../../components/app-main/app-main';

const getIngredientsDataState = state => state.ingredientsData;


const HomePage = () => {

  const dispatch = useDispatch();

  const { isLoading } = useSelector(getIngredientsDataState);

  useEffect(() => {
    dispatch({ type: GET_DATA_INGREDIENTS_REQUEST, payload: {} })
  }, []);

  return (

    <AppPage>
      <AppHeader />
      <Loader size='large' isLoading={isLoading} />
      {
        !isLoading
          ? (
            <AppMainBlock>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
              </DndProvider>
            </AppMainBlock>
          )
          : null
      }
    </AppPage>
  )
};

export default HomePage;