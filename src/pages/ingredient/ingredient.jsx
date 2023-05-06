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

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function goToNotFoundPage() {
    navigate('/not-found-page', { replace: true });
  };

  const { isLoading, isError, ingredientInfo } = useSelector(getIngredientsDataState);

  /* достаём id из строки адреса*/
  const url = new URL(`https://${location.pathname}`);
  const currentPath = url.pathname;
  const id = currentPath.split('/').pop();


  useEffect(() => {
    if (!ingredientInfo._id || ingredientInfo.path !== currentPath) {
      dispatch(getIngredientInfo(goToNotFoundPage, id, currentPath))
    }
  }, []);

  return (
    <div className={stylesIngredient.container}>
      <Loader size={100} isLoading={isLoading} isError={isError} />
      {!isLoading && <IngredientDetails ingredient={ingredientInfo} titleAlign='center' />}
    </div>
  )
};

export default IngredientPage;