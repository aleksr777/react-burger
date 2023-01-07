import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { UPDATE_DATA } from '../../services/actions/ingredients-data-actions';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import AppMain from '../app-main/app-main';
import Preloader from '../../ui/preloader/preloader';
import { apiConfig } from '../../constants/constants';
import { getIngredientsData } from '../../utils/api';

const App = () => {

  const dispatch = useDispatch();

  // Стейт для отслеживания загрузки ингредиентов с сервера
  const [ingredientsLoading, setIngredientsLoading] = useState(true);

  useEffect(() => {
    getIngredientsData(apiConfig)
      .then(res => {
        dispatch({ type: UPDATE_DATA, payload: { data: res.data } });
      })
      .catch(err => { alert('Ошибка загрузки данных с сервера'); console.log(err); })
      .finally(() => setIngredientsLoading(false));
  }, []);

  return (

    <div className={appStyles.app}>

      <AppHeader />

      {
        ingredientsLoading
          ? (<Preloader />)
          : (<AppMain />)
      }

    </div >
  )
};

export default App;