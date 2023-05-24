import stylesIngredientDetails from './ingredient-details.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { getIngredientInfo } from '../../services/ingredients-data/ingredients-data-actions';
import IngredientDetailsLayout from '../../components/ingredient-details-layout/ingredient-details-layout';
import { getIngredientDetailsState } from '../../utils/selectors';

/* Реализовал этот компонент так, чтобы можно было получить информацию по ингредиенту, если переходить на страницу по внешней ссылке*/
const IngredientDetailsPage = () => {

  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //достаём id из строки адреса
  const id = pathname.split('/').pop();

  const { ingredient } = useSelector(getIngredientDetailsState);

  function goToNotFoundPage() {
    navigate('/not-found-page', { replace: true });
  };

  useEffect(() => {
    if (!ingredient || !ingredient._id || ingredient.path !== pathname) {
      dispatch(getIngredientInfo(goToNotFoundPage, id, pathname))
    }
  }, []);

  return (
    ingredient &&
    <div className={stylesIngredientDetails.container}>
      <IngredientDetailsLayout ingredient={ingredient} titleAlign='center' />
    </div>
  )
};

export default IngredientDetailsPage;