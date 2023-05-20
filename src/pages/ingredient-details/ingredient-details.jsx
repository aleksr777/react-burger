import stylesIngredientDetails from './ingredient-details.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { getIngredientInfo } from '../../services/ingredients-data/ingredients-data-actions';
import IngredientDetailsLayout from '../../components/ingredient-details-layout/ingredient-details-layout';
import { getIngredientsDataState } from '../../utils/selectors';

/* Реализовал этот компонент так, чтобы можно было получить информацию по ингредиенту, если переходить на страницу по внешней ссылке*/
const IngredientDetailsPage = () => {

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
    <div className={stylesIngredientDetails.container}>
      {!isLoading && <IngredientDetailsLayout ingredient={ingredientInfo} titleAlign='center' />}
    </div>
  )
};

export default IngredientDetailsPage;