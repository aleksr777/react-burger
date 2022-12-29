import { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import AppMain from '../app-main/app-main';
import { apiConfig } from '../../constants/constants';
import { getIngredientsData } from '../../utils/api';
import { IngredientsContext } from '../../context/ingredients-context';

const App = () => {

  // Стейт для отслеживания загрузки ингредиентов с сервера
  const [ingredientsLoading, setIngredientsLoading] = useState(true);

  // Cтейт для данных, полученныx с сервера
  const [ingredientsData, setIngredientsData] = useState({});

  useEffect(() => {
    getIngredientsData(apiConfig)
      .then(res => { setIngredientsData(res.data) })
      .catch(err => { alert('Ошибка загрузки данных с сервера'); console.log(err); })
      .finally(() => setIngredientsLoading(false));
  }, []);
  return (
    <div className={appStyles.app}>

      <AppHeader />

      {ingredientsLoading
        ? (<div>Загрузка...</div>)
            /* <Preloader/> */
        : (
          <IngredientsContext.Provider value={{ ingredientsData }}>
            <AppMain />
          </IngredientsContext.Provider>
        )
      }

    </div>
  )
};

export default App;