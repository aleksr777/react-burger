import stylesIngredient from './ingredient.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { getIngredientInfo } from '../../services/ingredients-data/ingredients-data-actions';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import Loader from '../../components/loader/loader';

const getIngredientsDataState = state => state.ingredientsData;

/* Реализовал этот компонент так, чтобы можно было получить информацию по ингредиенту, если переходить на страницу по внешней ссылке*/
const IngredientPage = () => {

  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* достаём id из строки адреса*/
  const id = pathname.split('/').pop();

  const { isLoading, isError, ingredientInfo } = useSelector(getIngredientsDataState);

  function goToNotFoundPage() {
    navigate('/not-found-page', { replace: true });
  };

  useEffect(() => {
    if (!ingredientInfo || !ingredientInfo._id || ingredientInfo.path !== pathname) {
      dispatch(getIngredientInfo(goToNotFoundPage, id, pathname))
    }
  }, []);

  return (
    ingredientInfo &&
    (<div className={stylesIngredient.container}>
      <Loader size={100} isLoading={isLoading} isError={isError} />
      {!isLoading && <IngredientDetails ingredient={ingredientInfo} titleAlign='center' />}
    </div>)
  )
};

export default IngredientPage;